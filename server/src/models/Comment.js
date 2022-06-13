const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    IdSender: {
        type: String,
        required: true,
    },
    IdArticle: {
        type: String,
        default: '',
    },
    Body: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comments', CommentSchema);
