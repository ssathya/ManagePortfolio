var passport = require('passport');
var passportJwt = require('passport-jwt');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/account');
var uiUtils = require('./utils');
exports.accountRegisterGet = function (req, res, next) {
    res.render('accountCreateForm', { title: 'New Registration' });
}

exports.accountRegisterPost = function (req, res, next) {
    var name = uiUtils.cleanUserInput(req, 'name');
    var email = uiUtils.cleanUserInput(req, 'email');
    var username = uiUtils.cleanUserInput(req, 'username');
    var password = uiUtils.cleanUserInput(req, 'password');
    var password1 = uiUtils.cleanUserInput(req, 'password1');
    var errors = req.validationErrors();

    if (errors || password !== password1) {
        res.render('accountCreateForm',
            {
                title: 'New Registration',
                errors: errors
            });
    }
    Account.register(new Account({
        username: username,
        email: email,
        name: name,
    }), password, function (err, account) {
        if (err) {
            console.log('error while register!', err);
            res.render('accountCreateForm',
                {
                    title: 'New Registration',
                    errors: err
                });
        }
        req.login(account, function (err) {
            if (err) {
                console.log('error while logging in!', err);
                return next(err);
            }
            res.redirect('/');
        })
    });
}

exports.authLoginGet = function (req, res, next) {
    res.render('login', { title: 'Please log in' });
};

exports.authLoginPost = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/auth/login'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.logOutAll = function (req, res, next) {
    req.logout();
    res.redirect('/');
}