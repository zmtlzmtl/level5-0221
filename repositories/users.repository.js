const { Users } = require("../models")

class UsersRepository {
    constructor() {}

    findUser = async ({ nickname }) => {
        const user = await Users.findOne({
            where: {
            nickname
            }
        });
        return user;
    };

    postCreateUser = async ({ nickname, password }) => {
        const user = await Users.create({
            nickname,
            password
        });
        return user;
    }
};

module.exports = UsersRepository;