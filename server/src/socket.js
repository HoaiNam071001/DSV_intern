const socket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    });
    io.use((socket, next) => {
        // const username = socket.handshake.auth.username;
        // if (!username) {
        //   return next(new Error("invalid username"));
        // }
        // socket.username = username;
        next();
    });

    io.on('connection', (socket) => {
        //socket.join('room1');

        console.log('connection', socket.id);
        io.of('/').adapter.on('create-room', (room) => {
            console.log(`room ${room} was created`);
        });
        socket.on('private message', ({ content, to }) => {
            console.log(`from ${socket.id}`);
            socket.in('room1').emit('private message', {
                content,
                from: socket.id,
            });
        });
        socket.on('disconnect', () => {
            console.log(`disconnect: ${socket.id}`);
        });
    });
};
module.exports = socket;
