const { responseCodesEnum, constant: { AUTHORIZATION } } = require('../constants');
const { OAuthModel } = require('../dataBase');
const { ErrorHandler, errorMessages: { WRONG_EMAIL_OR_PASSWORD } } = require('../errors');
const { passwordHasher } = require('../helpers');
const { authService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            if (!req.user) {
                throw new ErrorHandler(responseCodesEnum.FORBIDDEN, WRONG_EMAIL_OR_PASSWORD.message,
                    WRONG_EMAIL_OR_PASSWORD.code);
            }

            const { password: hashPassword } = req.user;
            const { password } = req.body;

            await passwordHasher.compare(hashPassword, password);

            const tokenPair = authService.generateTokenPair();

            // eslint-disable-next-line no-undef
            await OAuthModel.create({ ...tokenPair, user: _id });

            res.json({ ...tokenPair, user: req.user });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await OAuthModel.remove({ accessToken: token });

            res.status(responseCodesEnum.NO_CONTENT).json('Success');
        } catch (e) {
            next(e);
        }
    },
};
