const mongoose = require('mongoose');
const Room = mongoose.model('Room');
const Mess = mongoose.model('Message');
const User = mongoose.model('User');

const Messenger = (() => {
    const getRooms = (req, res, next) => {
        try {
            Room.find({
                members: { $in: [req.payload.id] },
            })
                .populate('members')
                .then((rooms) => {
                    res.json({ rooms: rooms.map((room) => room.toRoomJSON(req.payload.id)) });
                })
                .catch(next);
        } catch (err) {
            return res.status(422).json({ errors: { conversation: [err] } });
        }
    };
    const getMessByUser = async (req, res, next) => {
        try {
            const id = req.payload.id,
                { userId, where, limit = 10 } = req.body;
            if (!userId) throw ' invalid';
            Promise.all([
                Room.findOne({ $or: [{ members: [userId, id] }, { members: [id, userId] }] }).populate('members'),
                User.findById(userId),
            ]).then(([room, user]) => {
                if (!room) {
                    const newRoom = new Room({
                        members: [id, userId],
                    });
                    newRoom.save().then((room) =>
                        res.json({
                            room: room.toRoomJSONFor(user),
                            messenger: [],
                            count: { totalCount: 0, currentCount: 0 },
                        })
                    );
                } else {
                    const query = { roomId: room.id, createdAt: { $lte: where ? where : Date.now() } };
                    Promise.all([
                        Mess.find(query).sort({ createdAt: 'desc' }).limit(limit).populate('sender'),
                        Mess.count(query),
                    ])
                        .then(([messages, totalCount]) => {
                            if (room.members.findIndex((user) => String(user._id) === String(id)) === -1)
                                return res.status(422).json({ errors: { messenger: ['Unauthentication'] } });
                            return res.json({
                                room: room.toRoomJSONFor(user),
                                messenger: Mess.toJSONFor(messages),
                                count: { totalCount, currentCount: messages.length },
                            });
                        })
                        .catch(next);
                }
            });
        } catch (err) {
            return res.status(422).json({ errors: { messenger: [err] } });
        }
    };
    const getMessByRoom = async (req, res, next) => {
        try {
            const id = req.payload.id,
                { roomId, where, limit = 10 } = req.body;
            const query = { roomId, createdAt: { $lte: where ? where : Date.now() } };
            if (!roomId || typeof roomId !== 'string') throw ' invalid';
            Promise.all([
                Room.findById(roomId).populate('members'),
                Mess.find(query).sort({ createdAt: 'desc' }).limit(limit).populate('sender'),
                Mess.count(query),
            ])
                .then(([room, messages, totalCount]) => {
                    if (!room) return res.status(422).json({ errors: { messenger: ['room invalid'] } });
                    if (room.members.findIndex((user) => String(user._id) === String(id)) === -1)
                        return res.status(422).json({ errors: { messenger: ['Unauthentication'] } });
                    return res.json({
                        room: room.toRoomJSON(id),
                        messenger: Mess.toJSONFor(messages),
                        count: { totalCount, currentCount: messages.length },
                    });
                })
                .catch(next);
        } catch (err) {
            return res.status(422).json({ errors: { messenger: [err] } });
        }
    };
    const createMess = async (req, res) => {
        try {
            const newMessage = new Mess({
                roomId: req.body.to,
                content: req.body.message.content,
                createdAt: req.body.message.createdAt,
                sender: req.body.message.sender.id,
            });
            newMessage
                .save()
                .then((message) => res.json({ message: message.toMessageJSONFor(req.body.message.sender) }));
        } catch (err) {
            return res.status(422).json({ errors: { messenger: [err] } });
        }
    };
    return {
        getRooms,
        getMessByUser,
        getMessByRoom,
        createMess,
    };
})();

module.exports = Messenger;
