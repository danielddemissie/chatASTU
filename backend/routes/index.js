const {
  addUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require('../controllers');
const { Router } = require('express');

const route = Router();

const userRoutes = route
  .post('/user/add', addUser)
  .get('/user/all', getAllUsers)
  .put('/user/edit/:_id', editUser)
  .delete('/user/delete/:_id', deleteUser);
module.exports = { userRoutes };
