const express = require('express');
//const auth = require('../middleware/auth');
const passport = require('../config/passportConfig');

const route = express.Router();

route.get('/', passport.authenticate('local'), (req, res) => {
  res.status(200).json({
    msg: 'welcome to restricted page!',
  });
});

route.get('/1', passport.authenticate('local'), (req, res) => {
  res.status(200).json({
    msg: 'welcome to 2nd restricted page!',
  });
});

module.exports = route;
