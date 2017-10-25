var mongoose = require('mongoose');
var Customer = require('./customer')
var Product = require('./product')
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    member: {type: Schema.Types.ObjectId, ref: 'Customer'},
    created_date: {type: Date, default: Date.now },
    total: Number,
    items: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

module.exports = mongoose.model('collection', TransactionSchema)