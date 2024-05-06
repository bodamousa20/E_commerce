const Product = require('../models/product');
const Order = require('../models/order');

exports.getAllOrders = (req, res) => {
    const adminId = req.user.id;

    Order.find({ admin_id: adminId })
        .populate('product_id')
        .then(orders => {
            res.json({ success: true, orders });
        })
        .catch(err => {
            console.error('Error fetching orders:', err);
            res.status(500).json({ success: false, error: 'Error fetching orders' });
        });
};

exports.getMyProducts = (req, res) => {
    const adminId = req.user.id;

    Product.find({admin_id : adminId})
        .then(product => {
            res.json({ success: true, product });
        })
        .catch(err => {
            console.error('Error fetching product:', err);
            res.status(500).json({ success: false, error: 'Error fetching product' });
        });
};

exports.updateProduct = (req, res) => {
    const prodId = req.params.prodId;
    const { name, description, price, image } = req.body;

    Product.findByIdAndUpdate(prodId, {
        name,
        description,
        price,
        imageURL: image
    })
    .then(updatedProduct => {
        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, message: 'Product updated successfully' });
    })
    .catch(err => {
        console.error('Error updating product:', err);
        res.status(500).json({ success: false, error: 'Error updating product' });
    });
};

exports.deleteProduct = (req, res) => {
    const prodId = req.params.prodId;

    Product.findByIdAndDelete(prodId)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ success: false, error: 'Product not found' });
            }
            res.json({ success: true, message: 'Product deleted successfully' });
        })
        .catch(err => {
            console.error('Error deleting product:', err);
            res.status(500).json({ success: false, error: 'Error deleting product' });
        });
};

exports.getAddProduct = (req, res) => {
    res.json({ success: true, pageTitle: "Add Product" });
};

exports.postAddProduct = (req, res) => {
    const adminId = req.user.id;
    const { name, description, price, image } = req.body;

    const newProduct = new Product({
        admin_id: adminId,
        name: name,
        description: description,
        price: price,
        imageURL: image
    });

    newProduct.save()
        .then(product => {
            res.json({ success: true, message: 'Product added successfully', product });
        })
        .catch(err => {
            console.error('Error adding product:', err);
            res.status(500).json({ success: false, error: 'Error adding product' });
        });
};
