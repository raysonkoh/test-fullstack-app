const express = require('express');
const User = require('../models/User');
const route = express.Router();

route.get('/', (req, res) => {
    User.find({})
        .then(users => {
            res.status(200).json({
                msg: 'Hello world!',
                users: users
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
            newUser.save()
                .then(usr => {
                    return res.status(200).json({
                        msg: 'Successfully created user.',
                        name,
                        email
                    });
                });
        })
        .catch(err => console.log(err));
});

module.exports = route;
