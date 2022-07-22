const { Message } = require('../services/mongoose');

const Messenger = (() => {
    const getRooms = (req, res, next) => {
        try {
            Message.getRoomsByUser(req.payload.id)
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
            Message.getMessUser(id, userId).then(([room, user]) => {
                if (!room) {
                    Message.newRoom(id, userId, user).then((result) => res.json(result));
                } else {
                    Message.getMessage(room.id, limit, where)
                        .then(([messages, totalCount]) => {
                            if (room.members.findIndex((user) => String(user._id) === String(id)) === -1)
                                return res.status(422).json({ errors: { messenger: ['Unauthentication'] } });
                            return res.json(Message.resultMessage({ room, user, messages, totalCount }));
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

            Message.getMessRoom(roomId, query, limit)
                .then(([room, messages, totalCount]) => {
                    if (!room) return res.status(422).json({ errors: { messenger: ['room invalid'] } });
                    if (room.members.findIndex((user) => String(user._id) === String(id)) === -1)
                        return res.status(422).json({ errors: { messenger: ['Unauthentication'] } });
                    return res.json(Message.resultMessage2({ room, id, messages, totalCount }));
                })
                .catch(next);
        } catch (err) {
            return res.status(422).json({ errors: { messenger: [err] } });
        }
    };
    const createMess = async (req, res) => {
        try {
            Message.newMessage(
                {
                    roomId: req.body.to,
                    content: req.body.message.content,
                    createdAt: req.body.message.createdAt,
                    sender: req.body.message.sender.id,
                },
                req.body.message.sender
            ).then((message) => res.json(message));
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
