const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const { encryptOrder, decryptOrder } = require('../utils/encryptionUtils');


exports.getAllProducts = (req, res) => {
    Product.find()
        .then(products => {
            console.log(req.session.token, "this is token from session")
            res.json({ success: true, products });
        })
        .catch(err => {
            console.error('Error loading products:', err);
            res.status(500).json({ success: false, error: 'Error loading products' });
        });
};

exports.addToCart = (req, res) => {
    const prodId = req.params.prodId;
    const userId = req.user.id;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    Order.findOne({ user_id: userId, product: prodId })
        .then(existingOrder => {
            if (existingOrder) {
                return Order.findByIdAndUpdate(existingOrder._id, { $inc: { quantity: 1 } });
            } else {
                return Product.findById(prodId).populate('admin_id')
                    .then(product => {
                        if (!product) {
                            return res.status(404).json({ success: false, error: 'Product not found' });
                        }

                        const newOrder = new Order({
                            user_id: userId,
                            admin_id: product.admin_id,
                            product_id: prodId,
                            quantity: 1
                        });

                        const encryptedOrder = encryptOrder(newOrder);
                        req.session.cart.push({ order: encryptedOrder });
                        // console.log(`encry order ${encryptOrder}`)
                        console.log(`Cart from session: ${req.session.cart}`);

                        return newOrder.save();
                    });
            }
        })
        .then(() => {
            return User.findByIdAndUpdate(userId, { $push: { 'cart.items': { productId: prodId, quantity: 1 } } });
        })
        .then(() => {
            res.json({ success: true, message: 'Order placed successfully' });
        })
        .catch(err => {
            console.error('Error placing order:', err);
            res.status(500).json({ success: false, error: `Error placing order: ${err}` });
        });
};

exports.getAllOrders = async (req, res) => {

    try {
        const encryptedOrders = req.session.cart || [];
        if (!encryptedOrders) {
            return res.json({ success: true, message: 'No orders found' });
        }
        
        const decryptedOrders = encryptedOrders.map(encryptedOrder => decryptOrder(encryptedOrder.order));

        // Fetch product details for each order
        const ordersWithDetails = await Promise.all(decryptedOrders.map(async order => {
            const product = await Product.findById(order.product_id);
            if (!product) {
                return null;
            }
            
            return { ...order, product };
        }));

        const validOrders = ordersWithDetails.filter(order => order !== null);

        res.json({ success: true, orders: validOrders });
    } catch (err) {
        console.error('Error fetching orders from session:', err);
        res.status(500).json({ success: false, error: 'Error fetching orders from session' });
    }
};


exports.getProduct = (req, res) => {
    const prodId = req.params.prodId;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }

            res.json({ success: true, product });
        })
        .catch(err => {
            console.error('Error fetching product:', err);
            res.status(500).json({ success: false, error: 'Error fetching product' });
        });
};
