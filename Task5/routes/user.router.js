const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.checkIsUserCreateValid, userMiddleware.checkIsEmailExist, userController.createUser);

router.delete('/:userId', userMiddleware.checkIsUserPresent, userController.deleteUserById);

router.get('/:userId', userMiddleware.checkIsUserPresent, userController.getUserById);

router.put('/:userId', userMiddleware.checkIsUserPresent, userMiddleware.checkIsUserUpdateValid,
    userMiddleware.checkIsEmailExist, userController.updateUserById);

module.exports = router;
