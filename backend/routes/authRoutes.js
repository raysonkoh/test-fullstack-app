const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const route = express.Router();

route.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            msg: 'Name, Email and Password are required'
        });
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    msg: 'No such user exists'
                });
            }

            if (password === user.password) {
                return res.status(200).json({
                    msg: 'Login successful!',
                    email
                })
            } else {
                return res.status(401).json({
                    msg: 'Password and Email are incorrect',
                });
            }
        })
        .catch(err => console.log(err));
});

route.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            msg: 'Name, Email and Password are required'
        });
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    msg: 'User already exists'
                });
            }


            newUser = new User({
                name, 
                email, 
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then(usr => {
                            return res.status(200).json({
                                msg: 'Successfully created user.',
                                name,
                                email
                            });
                        });
                });
            });
        })
        .catch(err => console.log(err));
});

module.exports = route;
