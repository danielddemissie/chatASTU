const {
  addUser,
  getAllUsers,
  editUser,
  deleteUser,
  addChat,
  loginUser,
  getUser,
} = require('../controllers');
const { Router } = require('express');

const route = Router();

const userRoutes = route
  .post('/user/add', addUser)
  .get('/user/all', getAllUsers)
  .get('/user/single', getUser)
  .get('/user/signin', loginUser)
  .put('/user/edit/:_id', editUser)
  .delete('/user/delete/:_id', deleteUser);
const chatRoutes = route.post('/chat/add/:_id', addChat);
module.exports = { userRoutes, chatRoutes };
