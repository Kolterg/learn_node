const Joi = require('joi');

const { regexp, userRolesEnum } = require('../../constants');

module.exports = {
    createUser: Joi.object().keys({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().regex(regexp.EMAIL_REGEXP),
        password: Joi.string().min(4).max(256).required(),
        // year: Joi.number().min(new Date().getFullYear() - 120).max(new Date().getFullYear())
        role: Joi.string().allow(...Object.values(userRolesEnum))
    })
};
