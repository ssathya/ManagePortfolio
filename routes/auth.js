var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();
var accountController = require('../controllers/authController');

router.get('/register', accountController.accountRegisterGet);

module.exports=router;