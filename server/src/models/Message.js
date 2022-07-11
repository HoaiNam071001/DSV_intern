const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        default: '',
    },
    roomname: { type: String, required: true },
    createdAt: Date,
});

MessageSchema.methods.toMessageJSON = function () {
    return {
        sender: this.sender.toMessJSON(),
        content: this.content,
        createdAt: this.createdAt,
    };
};
MessageSchema.statics.toJSONFor = function (messages) {
    return messages.map((message) => message.toMessageJSON());
};

mongoose.model('Message', MessageSchema);
