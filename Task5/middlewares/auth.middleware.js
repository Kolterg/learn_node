const authValid = require('../validators/auth/auth.validator');
const ErrorHandler = require('../errors/ErrorHandler');
const { WRONG_EMAIL_OR_PASSWORD } = require('../errors/error-messages');
const { responseCodesEnum } = require('../constants');
const { UserModel } = require('../dataBase');

module.exports = {
    emailIsExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await UserModel.findOne({ email }).select('+password');

            if (!userByEmail) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, WRONG_EMAIL_OR_PASSWORD.message,
                    WRONG_EMAIL_OR_PASSWORD.code);
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
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, WRONG_EMAIL_OR_PASSWORD.message,
                    WRONG_EMAIL_OR_PASSWORD.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
