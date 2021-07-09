const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.checkIsUserCreateValid, userMiddleware.checkIsEmailExist, userController.createUser);

router.use('/:userId', userMiddleware.checkIsUserPresent);

router.delete('/:userId', userController.deleteUserById);

router.get('/:userId', userController.getUserById);

router.put('/:userId', userMiddleware.checkIsUserUpdateValid,
    userMiddleware.checkIsEmailExist, userController.updateUserById);

module.exports = router;
