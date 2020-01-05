const express = require('express');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const ONEHOUR = 60 * 60;
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

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    jwt.sign(
                        { userid: user.id }, 
                        keys.jwtSecret, 
                        { expiresIn: ONEHOUR }, 
                        (err, token) => {
                            if (err) throw err;
                            return res.status(200).json({
                                msg: 'Login successful!',
                                id: user.id,
                                token,
                                name: user.name,
                                email
                            });
                        });
                } else {
                    return res.status(400).json({
                        msg: 'Password and/or Email are incorrect',
                    });
                }
            });            
        });
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
                            jwt.sign(
                                { userid: newUser.id }, 
                                keys.jwtSecret, 
                                { expiresIn: ONEHOUR }, 
                                (err, token) => {
                                    if (err) throw err;
                                    return res.status(200).json({
                                        msg: 'Successfully created user.',
                                        id: user.id,
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

route.get('/users', auth, (req, res) => {
    const userid = req.user.userid;
    User.findById(userid)
        .then(user => res.status(200).json({ 
            id: user.id,
            name: user.name,
            email: user.email
        }));
});

module.exports = route;
