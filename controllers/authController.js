var account = require('../models/account');

exports.accountRegisterGet = function (req, res, next) {
    res.render('accountCreateForm', { title: 'New Registration' });
}