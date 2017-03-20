var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

var upload = multer({storage:storage});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload', { title: 'Excel file upload' });
});
router.post('/', upload.single('ssupload'),function(req, res) {
  res.send("File upload sucessfully.");
});

module.exports = router;
