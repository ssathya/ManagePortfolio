var express = require('express');
var router = express.Router();

exports.cleanUserInput = function (req, element) {
    req.sanitize(element).escape();
    req.sanitize(element).trim();
    return req.body[element];
}
exports.getUserName = function (req) {
    var usrName = '';
    if (req.user) {
        usrName = req.user.username;
    }
    return usrName;
}