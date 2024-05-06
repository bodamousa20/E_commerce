const mongoose = require('mongoose')
const product = require('./product')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    product:{
        items:[{
            productId: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantitiy: {type: Number, required: true, default: 1}
        }]
    }
})

module.exports = mongoose.model('Admin', adminSchema)