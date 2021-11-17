var express = require('express');
var router = express.Router();

const loginCheck = require('./middleware/loginCheck');

/* GET users listing. */

router.get('/Staff', function(req, res, next) {
  res.render('Staff', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 管理' });
});

router.get('/StaffManagement',loginCheck, function (req, res, next) {
  res.render('StaffManagement', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 管理' });
});

// show the list of model which can be edited
router.get('/M_Management',loginCheck, function (req, res, next){
  let sql = 'SELECT * FROM `model` WHERE 1; ';
  let params = [];
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('M_Management', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 模型管理', MList: '' });
      } else {
        // console.log(result);
        res.render('M_Management', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 模型管理', MList: result });
      }
    }
  })
});

// show the list of exhibition which can be edited
router.get('/E_Management',loginCheck, function (req, res, next){
  res.render('E_Management', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 展覽管理' });
});

// show the list of connection which can be edited
router.get('/C_Management',loginCheck, function (req, res, next){
  res.render('C_Management', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 展出管理' });
});

module.exports = router;