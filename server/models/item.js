const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ecommerce');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    category      : {type: String},
    productId     : {type: String},
    productName   : {type: String},
    price         : {type: Number, default: 0},
    quantity      : {type: Number, default: 0},
    discount      : {type: Number, default: 0},
    imageUrl      : {type: String},
    summary       : {type: String},
});

module.exports = mongoose.model('item', itemSchema);
