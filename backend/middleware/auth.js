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
        jwt.verify(token, keys.jwtSecret, (err, decoded) => {
            if (err) throw err;

            const userid = decoded.userid;
            User.findById(userid)
                .then(user => {
                    if (!user) {
                        res.status(401).json({
                            msg: 'Session invalid. Please log in again'
                        });
                    } else {
                        next();
                    }
                })
                .catch(error => console.log(error));
        });
    }
}

module.exports = auth;
