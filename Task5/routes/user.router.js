const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.checkIsUserValid, userMiddleware.checkIsEmailExist, userController.createUser);

router.delete('/:userId', userMiddleware.checkIsUserPresent, userController.deleteUserById);

router.get('/:userId', userMiddleware.checkIsUserPresent, userController.getUserById);

router.patch('/:userId', userMiddleware.checkIsUserPresent, userMiddleware.checkIsUserValid,
    userMiddleware.checkIsEmailExist, userController.updateUserById);

module.exports = router;
