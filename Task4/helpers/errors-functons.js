const { responseCodesEnum } = require('../constants');
const { UNKNOWN_ERROR, ROUE_NOT_FOUND } = require('../errors/error-messages');

// eslint-disable-next-line no-unused-vars
function _unknownError(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err || UNKNOWN_ERROR.message,
            customCode: err.code || UNKNOWN_ERROR.code,
        });
}

function _notFoundError(err, req, res, next) {
    next({
        status: responseCodesEnum.NOT_FOUND,
        message: ROUE_NOT_FOUND.message,
        customCode: ROUE_NOT_FOUND.code,
    });
}

module.exports = {
    _unknownError,
    _notFoundError
};
