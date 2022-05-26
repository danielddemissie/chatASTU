//chat model
const { model, Schema, Types } = require('mongoose');

const chatSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'text is required.'],
    },
    user: {
      type: String,
    },
    rname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Room = model('chats', chatSchema);
module.exports = Room;
