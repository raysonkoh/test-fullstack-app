function isAuthenticated(req, res, next) {
  console.log(req.session);
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({
      msg: 'Invalid session. Please log in again.',
    });
  }
}

module.exports = isAuthenticated;
