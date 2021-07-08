const { responseCodesEnum, constants } = require('../constants');
const { UserModel } = require('../dataBase');
const { passwordHasher } = require('../helpers');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await UserModel.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordHasher.hash(password);
            const createdUser = await UserModel.create({ ...req.body, password: hashedPassword });

            res.status(responseCodesEnum.CREATED).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await UserModel.findByIdAndDelete(userId);

            res.status(responseCodesEnum.NO_CONTENT).json(constants.UserIsDelete);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await UserModel.findByIdAndUpdate(userId, req.body);

            res.status(responseCodesEnum.CREATED).json(req.body);
        } catch (e) {
            next(e);
        }
    }
};
