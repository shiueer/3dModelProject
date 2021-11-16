var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  req.session.user = undefined;
  res.redirect('/management/Staff');
});

module.exports = router;
