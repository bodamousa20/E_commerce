const mongoose = require('mongoose');
require('dotenv').config();

const MONGOOSE_URI = process.env.MONGOOSE_URI;

const getDB = () => {
    mongoose.connect(MONGOOSE_URI)
        .then(() => {
            console.log('Connected successfully to MongoDB');        
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
};

module.exports = { getDB, connection: mongoose.connection };
