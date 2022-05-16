//chat model
const { model, Schema, Types } = require('mongoose');

const chatSchema = new Schema(
  {
    chat: {
      type: String,
      required: [true, 'chat name is required.'],
    },
    user: {
      type: Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Room = model('chats', chatSchema);
module.exports = Room;
