const UsersService = require('../services/users.service');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { KEY } = process.env;

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }
  
  postLoginUser = async (req, res, next) => {
    try {
        const { nickname, password } = req.body;
        
        if (!nickname || !password) {
            return res.status(400);
        }
        const signupUser = await this.usersService.postLoginUser({
            nickname,
            password
        });
      
        const token = jwt.sign(
          { userId: signupUser.userId },
          KEY,
        );
        res.cookie("Authorization", `Bearer ${token}`); // JWT를 Cookie로 할당합니다!
        res.status(200).json({ message: "로그인에 성공하셨습니다." });
    } catch (error) {
        next(error)
    } 
  };

  postCreateUser = async (req, res) => {
    try {
        const { nickname, password, confirm } = req.body;

        if (!nickname || !password) {
            return res.status(400);
        }

        const createUser = await this.usersService.postCreateUser({
            nickname,
            password,
            confirm,
        });
        res.status(201).json({ result: createUser });
    } catch (error) {
      next(error)
  } 
  }
};
module.exports = UsersController;