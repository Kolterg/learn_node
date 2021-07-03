const router = require('express').Router;

const { authMiddleware } = require('../middlewares');
const { authController } = require('../controllers');

router.post('/', authMiddleware.checkIsBodyValid, authMiddleware.emailIsExist, authController.authorization);

module.exports = router;
