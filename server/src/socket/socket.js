const request = require('supertest');
const jwt = require('jsonwebtoken');
const Users = require('./user');

const socket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    });
    io.use((socket, next) => {
        if (!socket.handshake.auth?.token) return next(new Error('User invalid'));
        jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) return next(new Error('User invalid'));
            socket.userId = decoded._id;
            next();
        });
    });
    io.on('connection', (socket) => {
        Users.addUser({ socketId: socket.id, id: socket.userId, rooms: [] });
        socket.on('join', ({ roomList = [] }, callback) => {
            const online = [];
            const rooms = roomList.map((room) => {
                if (room.id) {
                    socket.join(room.id);
                    socket.to(room.id).emit('status', { id: socket.userId, status: 'online' });
                    if (room.memberId && Users.getUser(room.memberId)) online.push(room.memberId);
                    return room.id;
                }
            });
            Users.addRooms(socket.id, rooms);
            callback(online);
        });
        socket.on('send', ({ message, to }, callback) => {
            request(server)
                .post('/api/messenger/create')
                .send({ message, to })
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return callback(err);
                    socket.to(to).emit('receive', res.body);
                    callback(res.body);
                });
        });
        // io.of('/').adapter.on('leave-room', (room, id) => {
        //     console.log(`socket ${id} has leave room ${room}`);
        // });
        socket.on('disconnect', () => {
            Users.getRooms(socket.id).forEach((room) => {
                socket.to(room).emit('status', { id: socket.userId, status: 'offline' });
            });
            Users.removeUser(socket.id);
        });
    });
};
module.exports = socket;
