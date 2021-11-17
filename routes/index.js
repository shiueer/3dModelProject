var express = require('express');
var router = express.Router();

const loginCheck = require('./middleware/loginCheck');

/* GET home page. */
router.get('/About', function (req, res, next) {
  res.render('About', { title: '埔里基督教醫院 - 交趾尪仔俗語故事' });
});

// fetch exhibitions' data from db
router.get('/', function (req, res, next) {
  // console.log(req.session);
  let sql = 'SELECT * FROM `exhibition` WHERE 1; ';
  let params = [];
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('index', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Edata: '' });
      } else {
        console.log(result);
        res.render('index', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Edata: result });
      }
    }
  })
});

// fetch models' data from db
router.get('/ExhibitionList', function (req, res, next) {
  let formData = req.query; // catch number to know where is the exhibition I am
  // console.log(formData.id);
  let params = [formData.id];
  let sql = 'SELECT * FROM `model`,`connection` WHERE ? = `connection`.`E_ID` AND `connection`.`M_ID` = `model`.`M_ID`';
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('ExhibitionList', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Mdata: '' });
      } else {
        console.log(result);
        res.render('ExhibitionList', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Mdata: result });
      }
    }
  })
});

// get models' path and push to web
router.get('/ModelView', function (req, res, next) {
  let M_ID = req.query; // catch number to know where is the exhibition I am
  // console.log(M_ID);
  let params = [M_ID.id];
  let sql = 'SELECT * FROM `model` WHERE ? = `model`.`M_ID`';
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('ModelView', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Mdata: '' });
      } else {
        // console.log(result);
        res.render('ModelView', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Mdata: result });
      }
    }
  })
});

module.exports = router;
