const {
  addUser,
  getAllUsers,
  editUser,
  deleteUser,
  addChat,
  loginUser,
  getUser,
  addRoom,
} = require('../controllers');
const { Router } = require('express');

const route = Router();

const userRoutes = route
  .post('/user/add', addUser)
  .get('/user/all', getAllUsers)
  .get('/user/single', getUser)
  .post('/user/signin', loginUser)
  .put('/user/edit/:_id', editUser)
  .delete('/user/delete/:_id', deleteUser);
const chatRoutes = route.post('/chat/add/:_id', addChat);
const roomRoutes = route.post('/room/add/:_id', addRoom);
module.exports = { userRoutes, chatRoutes, roomRoutes };
