const UsersRepository = require("../repositories/users.repository");
const { ValidationError } = require("../exceptions/index.exception");

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }
  postLoginUser = async ({ nickname, password }) => {
    const user = await this.usersRepository.findUser({
      nickname,
    });

    if (!user || password !== user.password) {
      throw new ValidationError("아이디 또는 비밀번호가 다릅니다.");
    }
    
    return user;
  };

  findUser = async ({ nickname }) => {
    const user = await this.usersRepository.findUser({
      nickname,
    });
    return user;
  };

  postCreateUser = async ({ nickname, password, confirm }) => {
    const isExistUser = await this.findUser({ nickname });

    if (isExistUser) {
      throw new ValidationError("유저가 존재합니다.");
    }
    if (password !== confirm) {
      throw new ValidationError("비밀번호가 다릅니다.");
    }
    const user = await this.usersRepository.postCreateUser({
      nickname,
      password,
    });

    return user;
  };
}

module.exports = UsersService;
