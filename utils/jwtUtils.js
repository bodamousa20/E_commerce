const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.TOKEN_SECRET_KEY;

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey);
};


const verifyToken = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = { generateToken, verifyToken };
