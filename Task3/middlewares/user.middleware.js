const userService = require('../services/user.service');

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        const { userId } = req.params;

        const userById = await userService.findOneById(userId);

        if (!userById) {
            res.json('User not found!');
        }

        req.user = userById;

        next();
    },

    checkIsLoginBusy: async (req, res, next) => {
        const users = await userService.findAll;
        const user = req.body;

        const userExist = users.find((value) => value.login === user.login);
        if (userExist) {
            res.json('Login is already busy!');
        }

        next();
    }
};
