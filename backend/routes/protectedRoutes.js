const express = require('express');
const auth = require('../middleware/auth');

const route = express.Router();

route.get('/', auth, (req, res) => {
    res.status(200).json({
        msg: 'welcome to restricted page!'
    });
});

route.get('/1', auth, (req, res) => {
    res.status(200).json({
        msg: 'welcome to 2nd restricted page!'
    });
})

module.exports = route;
