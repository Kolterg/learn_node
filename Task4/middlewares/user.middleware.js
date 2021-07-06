const { UserModel } = require('../dataBase');
const { USER_NOT_FOUND, LOGIN_IS_BUSY, NOT_ADMIN } = require('../errors/error-messages');
const { userRolesEnum, responseCodesEnum } = require('../constants');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userById = await UserModel.findById(userId);

            if (!userById) {
                throw new ErrorHandler(responseCodesEnum.NOT_FOUND, USER_NOT_FOUND.message, USER_NOT_FOUND.code);
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsLoginBusy: async (req, res, next) => {
        const users = await UserModel.find({});
        const user = req.body;

        const userExist = users.find((value) => value.login === user.login);
        if (userExist) {
            throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, LOGIN_IS_BUSY.message, LOGIN_IS_BUSY.code);
        }

        next();
    },

    checkIsAdmin: (req, res, next) => {
        try {
            const { role } = req.body;

            if (role !== userRolesEnum.ADMIN) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, NOT_ADMIN.message, NOT_ADMIN.code);
            }
        } catch (e) {
            next(e);
        }
    }
};
