const jwt = require('jsonwebtoken');
const config = require('config');

const VerifyToken = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');
    try {
        // Check if no token
        if (!token) throw 'missing authorization credentials';
        var xtoken = token.split(' ');
        // Verify token
        jwt.verify(xtoken[1], config.get('JWTsecret'), function (err, decoded) {
            if (err) throw 'Unauthorized';
            req.query.token = decoded;
        });

        next();
    } catch (err) {
        res.status(401).json({
            status: 'error',
            message: err,
        });
    }
};
const CheckToken = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');
    try {
        // Check if no token
        if (!token) {
            next();
            return;
        }
        var xtoken = token.split(' ');
        // Verify token
        jwt.verify(xtoken[1], config.get('JWTsecret'), function (err, decoded) {
            if (err) {
                next();
                return;
            }
            req.query.token = decoded;
            next();
        });
    } catch (err) {
        res.status(401).json({
            status: 'error',
            message: err,
        });
    }
};
module.exports = { VerifyToken, CheckToken };
