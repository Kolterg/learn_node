const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
    ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, TEN_M, THIRTY_D, ACCESS
} = require('../constants/constant');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: TEN_M });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: THIRTY_D });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        const secretWord = tokenType === ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

        await verifyPromise(token, secretWord);
    },
};
