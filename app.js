var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var mongoose = require('mongoose')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('config');

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var upload = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: 'my secret',
    resave: true, //save session view
    saveUninitialized: false //sessions that are brand new. empty
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//connect to mongoose
if (config.has('AppVar.dbConnectionStr')) {
    mongoose.connect(config.get('AppVar.dbConnectionStr'),
        function (err) {
            if (err) {
                console.log('Could not connet to mongodb');
                process.exit(1);
            }
        });

} else {
    console.log('No connection string provided exiting...');
    process.exit(1);
}

mongoose.Promise = require('bluebird');



app.use('/', index);
app.use('/users', users);
app.use('/auth/', auth);
app.use('/uploads', upload);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
