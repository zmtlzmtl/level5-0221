const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/signup', usersController.postCreateUser);  //변경
router.post('/login', usersController.postLoginUser);

module.exports = router;