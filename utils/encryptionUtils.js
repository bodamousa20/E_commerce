const crypto = require('crypto-js');
require('dotenv').config();

const encryptionKey = process.env.ENCRYPTION_SECRET_KEY;

const encryptOrder = (order) => {
    const encryptedOrder = crypto.AES.encrypt(JSON.stringify(order), encryptionKey).toString();
    return encryptedOrder;
};

const decryptOrder = (encryptedOrder) => {
    const decryptedBytes = crypto.AES.decrypt(encryptedOrder, encryptionKey);
    const decryptedOrder = JSON.parse(decryptedBytes.toString(crypto.enc.Utf8));
    return decryptedOrder;
};

module.exports = { encryptOrder, decryptOrder };
