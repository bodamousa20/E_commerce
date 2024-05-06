const express = require('express');
const app = express()
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken')

const adminController = require('../controllers/adminController');
const adminGuard = require('../middlewares/checkAdminRole')

router.use(authenticateToken.authenticateToken)

router.get('/orders', adminGuard.checkAdminRole,adminController.getAllOrders);

router.get('/myProducts', adminGuard.checkAdminRole,adminController.getMyProducts);

router.patch('/update-product/:prodId', adminGuard.checkAdminRole,adminController.updateProduct);

router.delete('/delete-product/:prodId', adminGuard.checkAdminRole,adminController.deleteProduct);

router.post('/add-product', adminGuard.checkAdminRole,adminController.postAddProduct);

module.exports = router;
