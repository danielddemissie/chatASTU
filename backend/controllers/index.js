//controllers
const { User, Room, Chat } = require('../models');
const { sendData } = require('../utils');

module.exports = {
  addUser: async (req, res) => {
    try {
      const { username } = req.body;
      const userExist = await User.findOne({
        username,
      });

      if (userExist) {
        return sendData(res, 'user already exits.', null);
      }
      const user = await new User({
        ...req.body,
      });

      //only admin
      if (username === 'admin') {
        await user.save();
        return sendData(res, 'User created successfully.', user);
      }
      //join public room by default
      //add user to public room

      const publicRoom = await Room.findOne({
        name: 'public',
      });
      if (publicRoom) {
        user.rooms.push(publicRoom._id);
        publicRoom.users.push(user._id);
        await publicRoom.save();
      }
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
  allChatinRoom: async (req, res) => {
    try {
      //sorted chat in created at
      const { rname } = req.params;
      const allChats = await Chat.find({
        rname,
      }).sort({ createdAt: 1 });
      return sendData(res, `all chats in ${rname}.`, allChats);
    } catch (error) {
      sendData(res, error.message, null);
    }
  },
  addChat: async (req, res) => {
    try {
      const { username } = req.query;
      const { rname } = req.params;
      const { text } = req.body;
      //find the user
      const newchat = await new Chat({
        text,
        user: username,
        rname,
      });
      await newchat.save();
      sendData(res, 'chat added', newchat);
    } catch (error) {
      sendData(res, error.message, null);
    }
  },

  joinRoom: async (req, res) => {
    try {
      const { _id } = req.params;
      const { name } = req.query;
      const user = await User.findOne({
        _id,
      });
      const room = await Room.findOne({
        name,
      });
      const existinRoom = user.rooms.find((rm) => rm === room._id);
      if (existinRoom) {
        return sendData(res, 'already joined', existinRoom);
      } else {
        if (user && room) {
          room.users.push(user._id);
          await room.save();
          return sendData(res, `${user.username} joined ${room.name}`, room);
        } else {
          return sendData(res, `error`, room);
        }
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
          name: req.body.roomName,
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
      const rooms = await Room.find();
      sendData(res, 'all rooms', rooms);
    } catch (error) {
      sendData(res, error.message, null);
    }
  },

  getAllRoomsOfUser: async (req, res) => {
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
  deleteRoom: async (req, res) => {
    try {
      const { _id } = req.params;
      // const { _id } = req.params;
      // const user = await User.findOne({
      //   _id,
      // });
      await Room.deleteOne({
        _id,
      });
      sendData(res, 'room delete ', null);
    } catch (error) {
      sendData(res, error.message, null);
    }
  },
};
