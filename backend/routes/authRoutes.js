const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Hello world!'
    });
});

module.exports = route;
