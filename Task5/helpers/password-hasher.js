const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { WRONG_EMAIL_OR_PASSWORD } = require('../errors/error-messages');
const { responseCodesEnum } = require('../constants');

module.exports = {
    compare: async (hashedPassword, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(responseCodesEnum.FORBIDDEN, WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code);
        }
    },
    hash: (password) => bcrypt.hash(password, 10)
};
