const { UserModel } = require('../dataBase');
const { userRolesEnum } = require('../constants');
const userService = require('../services/user.service');

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userById = await UserModel.findById(userId);

            if (!userById) {
                throw new Error('User not found!');
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsAdmin: (req, res, next) => {
        try {
            const { role } = req.body;

            if (role !== userRolesEnum.ADMIN) {
                throw new Error('Not admin!');
            }
        } catch (e) {
            next(e);
        }
    },

    checkIsLoginBusy: async (req, res, next) => {
        const users = await userService.findAll;
        const user = req.body;

        const userExist = users.find((value) => value.login === user.login);
        if (userExist) {
            throw new Error('Login is already busy!');
        }

        next();
    }
};
