var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/Staff', function(req, res, next) {
  res.render('Staff', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 管理' });
});

router.get('/StaffManagement', function(req, res, next) {
  res.render('StaffManagement', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 管理' });
});
module.exports = router;
