const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ecommerce');

var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    transactionId   : {type: String},
    date          : {type: Date, default: Date.now },
    cName         : {type: String},
    cAdress       : {type: String},
    cPhone        : {type: String},
    cEmail        : {type: String},
    detil         :[{productId:String,productName:String,price:Number,quantity:Number,discount:Number,imageUrl:String}]
});

module.exports = mongoose.model('transactions', transactionSchema);
