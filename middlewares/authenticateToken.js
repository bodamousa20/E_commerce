const jwt = require('jsonwebtoken');
const blackList = new Set();
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    console.log('header: ', req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized if no Authorization header
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token found
    }

    if (blackList.has(token)) {
        return res.sendStatus(401); // Token is blacklisted, unauthorized
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        req.user = user; // Attach user information to the request
        next();
    });
};

const addToBlacklist = (token) => {
    blackList.add(token);
};

module.exports = { authenticateToken, addToBlacklist };
