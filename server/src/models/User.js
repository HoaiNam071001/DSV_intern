const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
    },
    avatar_img: {
        type: String,
        default: 'default.png',
    },
    bio: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Users', UserSchema);
