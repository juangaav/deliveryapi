const { signup, login, getServices, createService } = require('../controller/authController');

const router = require('express').Router();

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/getServices').post(getServices);

router.route('/createService').post(createService);

module.exports = router;