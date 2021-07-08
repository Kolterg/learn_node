const { passwordHasher } = require('../helpers');

module.exports = {
    authorization: async (req, res, next) => {
        try {
            const { body: { password }, user } = req;

            await passwordHasher.compare(user.password, password);

            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },
};
