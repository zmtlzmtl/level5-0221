const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');  //[class UsersController]
const usersController = new UsersController();
// console.log(usersController);

router.post('/signup', usersController.postCreateUser);
router.post('/login', usersController.postLoginUser);

module.exports = router;

// UsersController {
//     postLoginUser: [AsyncFunction: postLoginUser],  
//     postCreateUser: [AsyncFunction: postCreateUser],
//     usersService: UsersService {
//       postLoginUser: [AsyncFunction: postLoginUser],
//       findUser: [AsyncFunction: findUser],
//       postCreateUser: [AsyncFunction: postCreateUser],
//       usersRepository: UsersRepository {
//         findUser: [AsyncFunction: findUser],
//         postCreateUser: [AsyncFunction: postCreateUser]
//       }
//     }
//   }