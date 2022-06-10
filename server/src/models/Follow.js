const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
    IdFollow: {
        type: String,
        required: true,
    },
    IdFollowed: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('follows', FollowSchema);
