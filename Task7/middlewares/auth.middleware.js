const authValid = require('../validators/auth/auth.validator');
const { responseCodesEnum, constant: { AUTHORIZATION } } = require('../constants');
const { OAuthModel } = require('../dataBase');
const { ErrorHandler, errorMessages: { WRONG_EMAIL_OR_PASSWORD, NO_TOKEN } } = require('../errors');
const { authService } = require('../services');

module.exports = {
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
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(responseCodesEnum.UNAUTHORIZED, NO_TOKEN.message, NO_TOKEN.code);
            }

            await authService.verifyToken(token);

            const tokenObject = await OAuthModel.findOne({ accessToken: token });

            if (!tokenObject) {
                throw new ErrorHandler(responseCodesEnum.UNAUTHORIZED, NO_TOKEN.message, NO_TOKEN.code);
            }

            req.user = tokenObject;

            next();
        } catch (e) {
            next(e);
        }
    },
};
