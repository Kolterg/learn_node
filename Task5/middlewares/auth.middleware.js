const authValid = require('../validators/auth/auth.validator');
const ErrorHandler = require('../errors/ErrorHandler');
const { responseCodesEnum, errorMessages } = require('../constants');
const { UserModel } = require('../dataBase');

module.exports = {
    emailIsExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await UserModel.findOne({ email }).select('+password');

            if (!userByEmail) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, errorMessages.WRONG_EMAIL_OR_PASSWORD);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBodyValid: (req, res, next) => {
        try {
            const { error } = authValid.signIn.validate(req.body);

            if (error) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, errorMessages.WRONG_EMAIL_OR_PASSWORD, 1);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
