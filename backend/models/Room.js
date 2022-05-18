//user model
const { model, Schema, Types } = require('mongoose');

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'room name is required.'],
      minlength: [3, 'room name should be atlease 3 character long.'],
      unique: [true, 'room already exits.'],
    },
    owner: {
      type: Types.ObjectId,
    },
    users: [
      {
        type: Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = model('rooms', roomSchema);
module.exports = Room;
