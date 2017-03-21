var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var auth=require('./routes/auth');
var app = express();
var expressValidator = require('express-validator');

//added for authentication
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//config
var config=require('config');

var Account = require('./models/account');




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
  secret: 'will be replaced by env variable',
  resave: true,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));

//passport config
app.use(passport.initialize());
app.use(passport.session());

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

app.use('/', index);
app.use('/users', users);
app.use('/uploads', upload);
app.use('/auth', auth);

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
