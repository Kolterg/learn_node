const userService = require('../services/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.findAll();

        res.json(users);
    },

    createUser: async (req, res) => {
        await userService.insertUser(req.body);

        res.json('I`m users response!');
    },

    getUserById: (req, res) => {
        const { user } = req;

        res.json(user);
    },

    deleteUserById: async (req, res) => {
        await userService.deleteUserById(req.body);

        res.json('User is del!');
    },

    updateUserById: async (req, res) => {
        const { userId } = req.params;

        await userService.updateUserById(userId, req.body);

        res.json('User is update!');
    }
};
