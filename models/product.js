var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: String,
    img: String,
    price: Number,
    category: String,
    stock: Number
})

module.exports = mongoose.model('Product', ProductSchema)