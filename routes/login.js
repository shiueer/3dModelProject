var express = require('express');
var router = express.Router();


let searchMemberData = (formData, req) => {
  return new Promise((rs, rj) => {
    let sql = 'SELECT * FROM staff WHERE S_ID=? AND Password=?';
    let params = [formData['staff_id'], formData['password']]
    req.sql(sql, params, function(err, result) {
      if(err) {
        console.log("[SELECT ERROR] -", err);
      } else {
        if(result.length == 0) {
          rj(404);
        } else {
          rs(result[0]);
        }
      }
    })
  })
}

router.post('/', async function (req, res, next) {
  let formData = req.body;
  console.log('formData', formData);
  try {
    await searchMemberData(formData, req);
    req.session.user = {
      staff_id: formData['staff_id']
    };
    console.log(req.session.user);
    res.status(200).redirect('/users/StaffManagement')
  } catch(e) {
    if(e == 404) {
      res.status(e).send('登入失敗，無此帳號');
    } else if(e == 403) {
      res.status(e).send('登入失敗，密碼錯誤');
    }
  }
});

module.exports = router;
