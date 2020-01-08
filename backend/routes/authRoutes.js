const express = require('express');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//const auth = require('../middleware/auth');
const passport = require('../config/passportConfig');
const isAuthenticated = require('../middleware/isAuthenticated');
const ONEHOUR = 60 * 60;
const route = express.Router();

route.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.user;
  return res.status(200).json({
    msg: 'Login successful!',
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

route.get('/logout', (req, res) => {
  req.logout();
});

route.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      msg: 'Name, Email and Password are required',
    });
  }

  User.findOne({email: email})
    .then(user => {
      if (user) {
        return res.status(400).json({
          msg: 'User already exists',
        });
      }

      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;

          newUser.save().then(usr =>
            res.status(200).json({
              msg: 'Successfully created user.',
              id: newUser.id,
              name,
              email,
            }),
          );
        });
      });
    })
    .catch(err => console.log(err));
});

route.get('/users', isAuthenticated, (req, res) => {
  const userid = req.user.id;
  User.findById(userid).then(user => {
    if (!user) {
      res.status(401).json({
        msg: 'Invalid token',
      });
    } else {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  });
});

module.exports = route;
