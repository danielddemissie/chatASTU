//chat model
const { model, Schema, Types } = require('mongoose');

const chatSchema = new Schema(
  {
    chat: {
      type: String,
      required: [true, 'chat is required.'],
    },
    userId: {
      type: Types.ObjectId,
    },
    roomId: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Room = model('chats', chatSchema);
module.exports = Room;
