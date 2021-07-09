const router = require('express').Router();

const { authMiddleware, userMiddleware } = require('../middlewares');
const { authController } = require('../controllers');

router.post('/login', authMiddleware.checkIsBodyValid, userMiddleware.getUserByDynamicParams('email'),
    authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

module.exports = router;
