//user model
const { model, Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required.'],
      minlength: [3, 'username should be atlease 3 character long.'],
      unique: [true, 'username already taken.'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [4, 'password should be atlease 4 character long.'],
    },
    currentroom: {
      type: Types.ObjectId,
    },
    rooms: [
      {
        type: Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model('users', userSchema);
module.exports = User;
