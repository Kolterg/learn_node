const Joi = require('joi');

const { regexp } = require('../../constants');

module.exports = {
    signIn: Joi.object().keys({
        email: Joi.string().regex(regexp.EMAIL_REGEXP),
        password: Joi.string().min(8).max(256).required(),
    })
};
