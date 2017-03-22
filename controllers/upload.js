var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');



exports.firmMaintainGet = function (req, res, next) {
    var usrName = utils.getUserName(req);
    res.render('firmMaintainForm', { title: 'Firm maintain', user: usrName });
};
exports.firmMaintainPost = function (req, res, next) {    
    res.redirect('/');
}