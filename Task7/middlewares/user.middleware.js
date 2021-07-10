const { userRolesEnum, responseCodesEnum } = require('../constants');
const { UserModel } = require('../dataBase');
const {
    ErrorHandler, errorMessages: {
        USER_NOT_FOUND, EMAIL_ALREADY_EXIST, LOGIN_IS_BUSY, NOT_ADMIN, WRONG_DATA, PERMISSION_DENIED
    }
} = require('../errors');
const userValidator = require('../validators/user/user.validator');

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

    checkIsEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await UserModel.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(responseCodesEnum.ALREADY_EXIST, EMAIL_ALREADY_EXIST.message, EMAIL_ALREADY_EXIST.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsLoginBusy: async (req, res, next) => {
        try {
            const { login } = req.body;
            const userByLogin = await UserModel.findOne({ login });

            if (userByLogin) {
                throw new ErrorHandler(responseCodesEnum.ALREADY_EXIST, LOGIN_IS_BUSY.message, LOGIN_IS_BUSY.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserAdmin: (req, res, next) => {
        try {
            const { role } = req.body;

            if (role !== userRolesEnum.ADMIN) {
                throw new ErrorHandler(responseCodesEnum.BAD_REQUEST, NOT_ADMIN.message, NOT_ADMIN.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRoles: (rolesArr = []) => (req, res, next) => {
        try {
            if (!rolesArr || !rolesArr.length) {
                return next();
            }
            const { role } = req.user;

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, PERMISSION_DENIED.message, PERMISSION_DENIED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserCreateValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, WRONG_DATA.message, WRONG_DATA.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserUpdateValid: (req, res, next) => {
        try {
            const { error } = userValidator.updateUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, WRONG_DATA.message, WRONG_DATA.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParams: (paramName, searchIn = 'body', dbKey = paramName) => async (req, res, next) => {
        try {
            const valueOfParams = req[searchIn][paramName];

            const userByParams = await UserModel.findOne({ [dbKey]: valueOfParams }).select('+password');

            req.user = userByParams;

            next();
        } catch (e) {
            next(e);
        }
    }
};
