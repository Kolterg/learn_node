const ErrorHandler = require('../errors/ErrorHandler');
const userValidator = require('../validators/user/user.validator');
const { UserModel } = require('../dataBase');
const { userRolesEnum, responseCodesEnum, errorMessages } = require('../constants');

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userById = await UserModel.findById(userId);

            if (!userById) {
                throw new ErrorHandler(responseCodesEnum.NOT_FOUND, errorMessages.USER_NOT_FOUND);
            }

            req.user = userById;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailExist: async (req, res, next) => {
        const { email } = req.body;
        const userByEmail = await UserModel.findOne({ email });

        if (userByEmail) {
            throw new ErrorHandler(responseCodesEnum.ALREADY_EXIST, errorMessages.EMAIL_ALREADY_EXIST);
        }

        next();
    },

    checkIsAdmin: (req, res, next) => {
        try {
            const { role } = req.body;

            if (role !== userRolesEnum.ADMIN) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, errorMessages.NOT_ADMIN);
            }
        } catch (e) {
            next(e);
        }
    },

    checkIsUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUser.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};