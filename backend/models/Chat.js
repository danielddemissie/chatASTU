//chat model
const { model, Schema, Types } = require('mongoose');

const chatSchema = new Schema(
  {
    chat: {
      type: String,
      required: [true, 'chat is required.'],
    },
    user: {
      type: Types.ObjectId,
    },
    room: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Room = model('chats', chatSchema);
module.exports = Room;
