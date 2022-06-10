const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    IdAuthor: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    Content: {
        type: String,
        default: '',
    },
    Image: {
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
    Tags: {
        type: Array,
        default: [],
    },
    Favorite: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('Articles', ArticleSchema);
