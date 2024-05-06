const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    admin_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
