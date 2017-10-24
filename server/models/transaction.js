'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
	buyer: { 
		type: Schema.Types.ObjectId, 
		ref: 'User',
		required: [true, 'Why u no input buyer?']
	},
	items: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
		required: [true, 'Please input at least one item']
	},
	date: Date,
	total_price: Number
});

module.exports = mongoose.model('Transaction', TransactionSchema);