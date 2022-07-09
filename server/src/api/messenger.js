const mongoose = require('mongoose');
const User = mongoose.model('User');
const Mess = mongoose.model('Message');

const Messenger = (() => {
    const getMess = (req, res, next) => {
        try {
            const id = req.payload ? req.payload.id : null,
                { roomname, limit = 20, offset = 0 } = req.body.room;
            if (!roomname) throw 'roomname invalid';
            User.findById(id)
                .then((user) => {
                    if (!user) return res.sendStatus(401);
                    if (user.indexOf(roomname) === -1)
                        res.status(422).json({ errors: { messenger: ['Unauthentication'] } });
                    Mess.find({ roomname })
                        .limit(Number(limit))
                        .skip(Number(offset))
                        .populate('sender')
                        .then((messages) => {
                            return res.json({ messenger: Mess.toJSONFor(messages) });
                        });
                })
                .catch(next);
        } catch (err) {
            return res.status(422).json({ messenger: { article: [err] } });
        }
    };
    // const createMess = (req, res, next) => {
    //     const message = new Mess(req.body.message);
    //     message.save();
    // };
    return {
        getMess,
    };
})();

module.exports = Messenger;
