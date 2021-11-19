var express = require('express');
const session = require('express-session');
var router = express.Router();

const loginCheck = require('./middleware/loginCheck');

/* GET users listing. */

router.get('/M_Edit', loginCheck,function(req, res, next) {
  let formData = req.query;
  console.log(formData);
  let params = [formData.M_ID];
  let sql = 'SELECT * FROM `model` WHERE ? = `model`.`M_ID`; ';
  let htmlStr = ``;
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('M_Edit', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 模型資料編輯', MData: '' });
      } else {
        res.render('M_Edit', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 模型管理', MData: result });
      }
    }
  })
});

router.get('/E_Edit', loginCheck,function(req, res, next) {
  let formData = req.query;
  console.log(formData);
  let params = [formData.E_ID];
  let sql = 'SELECT `exhibition`.`E_ID`,`E_Name`,`S_Date`,`E_Date`,`M_ID` FROM `connection`,`exhibition` WHERE ? =`exhibition`.`E_ID` && `exhibition`.`E_ID`=`connection`.`E_ID`;';
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('E_Edit', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 模型資料編輯', EData: '' });
      } else {
        res.render('E_Edit', { title: '埔里基督教醫院 - 交趾尪仔俗語故事 模型管理', EData: result });
      }
    }
  })
});
module.exports = router;