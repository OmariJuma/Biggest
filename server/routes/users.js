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
  .get(getAllUsers)
  .post(createUser);

  router.route('/:id')
  .get(checkToken,getUser)
  .put(updateUser) 
  .delete(deleteUser);

  router.route('/email/:email')
  .post(getUserByEmail);


  module.exports = router;