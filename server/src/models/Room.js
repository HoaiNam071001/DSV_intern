const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: Date,
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

mongoose.model('Room', RoomSchema);

RoomSchema.methods.toRoomJSONFor = function (messages) {
    return {
        name: this.name,
        messages: messages.map((message) => message.toMessageJSON()),
    };
};

RoomSchema.methods.toUserJSON = function () {
    return {
        name: this.name,
        member: this.member.toMessJSON(),
    };
};
