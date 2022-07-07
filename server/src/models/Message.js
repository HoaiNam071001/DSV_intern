const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: {
        type: String,
        default: '',
    },
    roomname: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    createdAt: Date,
});

MessageSchema.methods.toMessageJSON = function () {
    return {
        sender: this.sender.toMessJSON(),
        body: this.body,
        createdAt: this.createdAt,
    };
};

mongoose.model('Message', MessageSchema);
