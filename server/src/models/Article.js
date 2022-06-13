const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const ArticleSchema = new mongoose.Schema({
    IdAuthor: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        default: '',
    },
    Description: {
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
    Tags: {
        type: Array,
        default: [],
    },
    Favorite: {
        type: Array,
        default: [],
    },
    slug: {
        type: String,
        slug: 'Title',
        unique: true,
    },
});

module.exports = mongoose.model('Articles', ArticleSchema);
