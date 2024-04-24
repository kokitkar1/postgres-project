const { signup } = require('../controller/auth.controller.js');

const router = require('express').Router();

router.route('/signup').post(signup)


module.exports = router