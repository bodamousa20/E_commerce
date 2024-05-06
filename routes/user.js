const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken')

const userGuard = require('../middlewares/checkUserRole')

router.use(authenticateToken.authenticateToken)

router.get('/products',userGuard.checkUserRole, userController.getAllProducts);

router.post('/add-to-cart/:prodId',userGuard.checkUserRole, userController.addToCart);

router.get('/orders',userGuard.checkUserRole, userController.getAllOrders);

router.get('/product/:prodId',userGuard.checkUserRole, userController.getProduct);


module.exports = router;
