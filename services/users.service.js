const UsersRepository = require('../repositories/users.repository');

class UsersService {
    constructor() {
        this.usersRepository = new UsersRepository();
    }

};
module.exports = UsersService;