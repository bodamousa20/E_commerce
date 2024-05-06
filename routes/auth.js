const express = require('express')
const router = express.Router()
require('dotenv').config();

const authController = require('../controllers/authController')

router.post('/sign-up', authController.postSignUp)

router.post('/login', authController.postLogin)

router.post('/logout', authController.logOut);

module.exports = router