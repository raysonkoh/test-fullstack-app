const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

function auth(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        res.status(401).json({
            msg: 'Session invalid. Please log in again'
        });
    } else {
        try {
            const decoded  = jwt.verify(token, keys.jwtSecret);
            req.user = decoded;
            next()
        } catch (e) {
            res.status(400).json({ 
                msg: 'Invalid session. Please login again' 
            });            
        }
    }
}

module.exports = auth;
