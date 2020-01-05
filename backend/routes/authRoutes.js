const express = require('express');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const route = express.Router();
const ONEHOUR = 60 * 60;

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

            const token = req.headers['authorization'].split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    msg: 'Session expired. Please log in again'
                });
            }

            jwt.verify(token, keys.jwtSecret, (err, decoded) => {
                if (err) return res.status(401).json({
                    msg: 'Invalid session. Please log in again'
                });

                const userid = decoded.userid;
                console.log(userid);
                User.findById(userid)
                    .then(usr => {
                        if (!user) return res.status(401).json({
                            msg: 'Invalid session. Please log in again'
                        });

                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return res.status(200).json({
                                    msg: 'Login successful!',
                                    name: user.name,
                                    email
                                })
                            } else {
                                return res.status(401).json({
                                    msg: 'Password and Email are incorrect',
                                });
                            }
                        });            
                    });
            });
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

                    jwt.sign({ userid: newUser.id }, keys.jwtSecret, { expiresIn: ONEHOUR }, (err, token) => {
                        if (err) throw err;

                        newUser.save()
                            .then(usr => {
                                return res.status(200).json({
                                    msg: 'Successfully created user.',
                                    token,
                                    name,
                                    email
                                });
                            });
                    });
                });
            });
        })
        .catch(err => console.log(err));
});

module.exports = route;
