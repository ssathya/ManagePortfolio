var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();
var accountController = require('../controllers/authController');

router.get('/register', accountController.accountRegisterGet);
router.post('/register',accountController.accountRegisterPost);
router.get('/login', accountController.authLoginGet);
router.post('/login', accountController.authLoginPost);
router.all('/logout',accountController.logOutAll);
module.exports=router;