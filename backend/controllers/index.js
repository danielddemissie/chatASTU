//controllers
const { User, Room, Chat } = require('../models');
const { sendData } = require('../utils');

module.exports = {
  addUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userExist = await User.findOne({
        username,
      });
      if (userExist) {
        return sendData(res, 'user already exits.', null);
      }
      const user = await new User({
        ...req.body,
      });

      await user.save();
      return sendData(res, 'User created successfully.', user);
    } catch (error) {
      const msg = error.message.split(': ')[2];
      sendData(res, msg, null);
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
      return sendData(res, 'Please fill the form correctly.', null);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      //if the user number is too large
      //abort this function.
      const users = await User.find();
      sendData(res, 'All users.', users);
    } catch (error) {
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
      sendData(res, 'error getting deleting user.', null);
    }
  },

  addChat: async (req, res) => {
    try {
      const { _id } = req.params;
      const { roomId, chat } = req.body;
      //find the user
      const user = await User.findOne({
        _id,
      });
      if (user) {
        const newchat = await new Chat({
          chat,
          userId: _id,
          roomId,
        });
        sendData(res, 'chat added', newchat);
      } else {
        sendData(res, 'user not found', null);
      }
    } catch (error) {
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
        _id: roomId,
      });
      const existRoom = user.rooms.filter((rm) => rm !== roomId);
      if (existRoom) {
        return sendData(res, 'already joined', existRoom[0]);
      }
      if (user && room) {
        room.users.push(user._id);
        await room.save();
        sendData(res, `${user.username} joined ${room.name}`, room);
      } else {
        sendData(res, `error`, room);
      }
    } catch (error) {
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
        user.rooms.push(newRoom._id);
        await newRoom.save();
        await user.save();
        sendData(res, 'room created', newRoom);
      } else {
        sendData(res, 'user not found', null);
      }
    } catch (error) {
      sendData(res, error.message, null);
    }
  },

  getAllRooms: async (req, res) => {
    try {
      const { _id } = req.params;
      const user = await User.findOne({
        _id,
      });
      if (user) {
        const rooms = await Room.find({
          owner: _id,
        });
        sendData(res, 'all room of the user ' + user.username, rooms);
      }
    } catch (error) {
      sendData(res, error.message, null);
    }
  },
  getRoom: async (req, res) => {
    try {
      const { roomId } = req.body;
      const { _id } = req.params;

      const user = await User.findOne({
        _id,
      });
      const room = await Room.findOne({
        _id: roomId,
      });
      if (user) {
        sendData(res, 'room of ' + user.username, room);
      }
    } catch (error) {
      sendData(res, error.message, null);
    }
  },
};
