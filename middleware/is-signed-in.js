module.exports = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/account/sign-in')
  }
  next()
}
