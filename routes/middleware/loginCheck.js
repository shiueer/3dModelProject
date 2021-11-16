loginCheck = (req, res, next) => {
  if (req.session.user != undefined) {
    next();
  } else {
    res.redirect('/Staff');
  }
}

module.exports = loginCheck;