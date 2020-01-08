function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({
      msg: 'Invalid session. Please log in again.',
    });
  }
}

module.exports = isAuthenticated;
