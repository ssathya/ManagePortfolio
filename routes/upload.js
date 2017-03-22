var express = require('express');
var router = express.Router();
var multer = require('multer');
var utils = require('../utils/utils');
var uploads = require('../controllers/upload');

router.use(function (req, res, next) {
    if (!req.user) {
        return res.render('notauthorized', { title: 'Not authorized' });
    }
    next();
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
    var usrName = utils.getUserName(req);
    res.render('upload', { title: 'Excel file upload', user: usrName });
});
router.post('/', upload.single('ssupload'), function (req, res) {
    res.send("File upload sucessfully.");
});

router.get('/firmMaintain', uploads.firmMaintainGet);
//router.post('/firmMaintain', uploads.firmMaintainPost);
router.post('/firmMaintain', upload.single('NASDAQFile'), uploads.firmMaintainPost);

module.exports = router;
