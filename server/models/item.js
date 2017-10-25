'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
	name: String,
	imageUrl: String,
	price: Number,
	category: String,
	stock: Number
});

module.exports = mongoose.model('Item', ItemSchema);