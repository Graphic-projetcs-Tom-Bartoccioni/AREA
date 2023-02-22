const router = require('express').Router();

router.use('/app', require('./app.route'));

router.use('/me', require('./me.route'));

router.use('/users', require('../../middlewares/check_scope.middleware')('read:users update:users delete:users'), require('./users.route'));

module.exports = router;