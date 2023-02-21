const UsersService = require('../services/users.service');

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }

  postLoginUser = async (req, res) => {
    try {
        const signupUser = await this.usersService.postLoginUser({});
        res.status(200).json({ result: signupUser});
    } catch (error) {
        console.error(error);
        res.json({ errorMessage: error.message });;
    } 
  };

  postCreateUser = async (req, res) => {
    try {
        const { nickname, password } = req.body;

        if (!nickname, !password) {
            return res.status(400);
        }

        const createUser = await this.usersService.postCreateUser({
            nickname,
            password
        });

        res.status(201).json({ result: createUser });
    } catch (error) {
        console.error(error);
        res.json({ errorMessage: error.message });;
    } 
  }
};
module.exports = UsersController;