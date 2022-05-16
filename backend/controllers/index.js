//controllers
const { User, Room, Chat } = require('../models');
const { sendData, consoleError } = require('../utils');

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
};
