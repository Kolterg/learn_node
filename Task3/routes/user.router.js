const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.delete('/:userId', userMiddleware.checkIsUserPresent, userController.deleteUserById);

router.get('/:userId', userMiddleware.checkIsUserPresent, userController.getUserById);

router.post('/:userId', userController.updateUserById);

module.exports = router;
