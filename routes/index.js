var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  console.log(req.user);
  var usrName='';
  if (req.user){
    usrName=req.user.username;
  }
  res.render('index', {
    title: 'About',
    user: usrName
  });
});

module.exports = router;
