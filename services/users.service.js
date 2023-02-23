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
      const e = new Error('아이디 또는 비밀번호가 다릅니다.');
      e.name = '412';
      throw e;
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
      const e = new Error('유저가 존재합니다.');
      e.name = '412';
      throw e;
    }
    if (password !== confirm) {
      const e = new Error('비밀번호가 다릅니다.');
      e.name = '412';
      throw e;
    }
    const user = await this.usersRepository.postCreateUser({
      nickname,
      password,
    });

    return user;
  };
}

module.exports = UsersService;
