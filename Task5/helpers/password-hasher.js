const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { responseCodesEnum, errorMessages } = require('../constants');

module.exports = {
    compare: async (hashedPassword, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(responseCodesEnum.FORBIDDEN, errorMessages.WRONG_EMAIL_OR_PASSWORD);
        }
    },
    hash: (password) => bcrypt.hash(password, 10)
};
