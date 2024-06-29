const express = require('express');

const router = express.Router();

const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers, 
    getUserByEmail
  } = require('../controllers/users');
const { checkToken } = require('../middleware/jwt');

  router.route('/')
  .get(checkToken,getAllUsers)
  .post(createUser);

  router.route('/:id')
  .get(checkToken,getUser)
  .put(checkToken,updateUser) 
  .delete(checkToken,deleteUser);

  router.route('/email/:email')
  .post(getUserByEmail);


  module.exports = router;