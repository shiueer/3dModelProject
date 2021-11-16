loginCheck = (req, res, next) => {
  console.log(req.session);
  if (req.session.user != undefined) {
    next();
  } else {
    res.redirect('/management/Staff');
  }
}

module.exports = loginCheck;