//controllers
const { User, Room, Chat } = require('../models');
const { sendData, consoleError, userExist } = require('../utils');

module.exports = {
  addUser: async (req, res) => {
    try {
      const user = await new User({
        ...req.body,
      });
      await user.save();
      sendData(res, 'User created successfully.', user);
    } catch (error) {
      consoleError(error.message);
      sendData(res, error.message, null);
    }
  },
  getUser: async (req, res) => {
    try {
      const { _id } = req.params;
      const user = await User.findOne({
        _id,
      });

      sendData(res, 'User found.', user);
    } catch (error) {
      consoleError(error.message);
      sendData(res, 'User not found.', null);
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
      });
      if (user.password === password) {
        return sendData(res, 'User signin successfully.', user);
      } else {
        return sendData(res, 'Incorrect username or password', null);
      }
    } catch (error) {
      return sendData(res, error.message, null);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      //if the user number is too large
      //abort this function.
      const users = await User.find();
      sendData(res, 'All users.', users);
    } catch (error) {
      consoleError(error.message);
      sendData(res, 'error getting all users', null);
    }
  },
  editUser: async (req, res) => {
    try {
      const { _id } = req.params;
      const { username, password } = req.body;
      const user = await User.findOne({
        _id,
      });
      if (user) {
        if (username) {
          user.username = username;
        }
        if (password) {
          user.password = password;
        }
      }
      await user.save();
      sendData(res, 'User edited successfully', user);
    } catch (error) {
      consoleError(error.message);
      sendData(res, error.message, null);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { _id } = req.params;
      const user = await User.find({
        _id,
      });
      if (user) {
        await User.deleteOne({
          _id,
        });
      }
      sendData(res, 'User deleted.', null);
    } catch (error) {
      consoleError(error.message);
      sendData(res, 'error getting deleting user.', null);
    }
  },

  addChat: async (req, res) => {
    try {
      const { _id } = req.params;
      //find the user
      const user = await User.findOne({
        _id,
      });
      if (user) {
        const newchat = await new Chat({
          ...req.body,
          userId: _id,
          roomId: user.currentroom,
        });
        sendData(res, 'chat added', newchat);
      } else {
        sendData(res, 'user not found', null);
      }
    } catch (error) {
      consoleError(error.message);
      sendData(res, error.message, null);
    }
  },

  joinRoom: async (req, res) => {
    try {
      const { _id } = req.params;
      const { roomId } = req.body;

      const user = await User.findOne({
        _id,
      });

      const room = await Room.findOne({
        roomId,
      });
      if (user && room) {
        room.users.push(user._id);
        await room.save();
        sendData(res, `${user.username} joined ${room.name}`, room);
      }
    } catch (error) {
      consoleError(error.message);
      sendData(res, error.message, null);
    }
  },

  leaveRoom: async (req, res) => {
    try {
      const { _id } = req.params;
      const { roomId } = req.body;

      const user = await User.findOne({
        _id,
      });

      const room = await Room.findOne({
        roomId,
      });
      if (user && room) {
        room.users.filter((user) => user !== _id);
        await room.save();
        sendData(res, `${user.username} joined ${room.name}`, room);
      }
    } catch (error) {
      consoleError(error.message);
      sendData(res, error.message, null);
    }
  },

  addRoom: async (req, res) => {
    try {
      const { _id } = req.params;
      //find the user
      const user = await User.findOne({
        _id,
      });
      if (user) {
        const newRoom = await new Room({
          ...req.body,
          owner: _id,
        });
        newRoom.users.push(_id);
        await newRoom.save();
        sendData(res, 'room created', newRoom);
      } else {
        sendData(res, 'user not found', null);
      }
    } catch (error) {
      consoleError(error);
      sendData(res, error.message, null);
    }
  },
};
