const { UserModel } = require('../dataBase');
const { userRolesEnum, responseCodesEnum, errorMessages } = require('../constants');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userById = await UserModel.findById(userId);

            if (!userById) {
                throw new ErrorHandler(errorMessages.USER_NOT_FOUND, responseCodesEnum.NOT_FOUND);
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
            throw new ErrorHandler(errorMessages.LOGIN_IS_BUSY);
        }

        next();
    },

    checkIsAdmin: (req, res, next) => {
        try {
            const { role } = req.body;

            if (role !== userRolesEnum.ADMIN) {
                throw new ErrorHandler(errorMessages.NOT_ADMIN);
            }
        } catch (e) {
            next(e);
        }
    }
};
