const mongoose = require('mongoose');
const User = mongoose.model('User');

const Message = (() => {
    const getMessage = (req, res, next) => {
        try {
            const id = req.payload ? req.payload.id : null,
                { room, limit = 20, offset = 0 } = req.body.room;
        } catch (err) {
            res.status(422).json({ errors: { profile: [err] } });
        }
    };

    return {
        getprofile,
        followUser,
        unfollowUser,
    };
})();

module.exports = Message;
