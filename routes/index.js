var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

/* GET home page. */
router.get('/', function (req, res, next) {
  var usrName = utils.getUserName(req);
  res.render('index', {
    title: 'About',
    user: usrName
  });
});

module.exports = router;
