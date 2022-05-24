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
  getAllRoomsOfUser,
  joinRoom,
  allChatinRoom,
  deleteRoom,
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
const chatRoutes = route
  .post('/chat/add/:_id', addChat)
  .get('/chat/all/:roomId', allChatinRoom);
const roomRoutes = route
  .post('/room/add/:_id', addRoom)
  .get('/room/all/:_id', getAllRoomsOfUser)
  .post('/room/single/:_id', getRoom)
  .get('/room/joinroom/:_id', joinRoom)
  .delete('/room/delete/:_id', deleteRoom)
  .get('/room/all', getAllRooms);

module.exports = { userRoutes, chatRoutes, roomRoutes };
