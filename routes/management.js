var express = require('express');
var router = express.Router();

const loginCheck = require('./middleware/loginCheck');

/* GET users listing. */

router.get('/Staff', function(req, res, next) {
  res.render('Staff', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 管理' });
});

router.get('/StaffManagement',loginCheck, function (req, res, next) {
  let sql = 'SELECT * FROM `exhibition` WHERE 1;';
  let params = [];
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('StaffManagement', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', ManageData: '' });
      } else {
        // console.log(result);
        res.render('StaffManagement', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', ManageData: result });
      }
    }
  })
});

module.exports = router;