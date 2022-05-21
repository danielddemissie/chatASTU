const {
  addUser,
  getAllUsers,
  editUser,
  deleteUser,
  addChat,
  loginUser,
  getUser,
  getRoom,
  addRoom,
  getAllRooms,
  joinRoom,
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
const roomRoutes = route
  .post('/room/add/:_id', addRoom)
  .get('/room/all/:_id', getAllRooms)
  .post('/room/single/:_id', getRoom)
  .post('/room/joinroom/:_id', joinRoom);
module.exports = { userRoutes, chatRoutes, roomRoutes };
