let mongoose = require('mongoose');
let Schema = mongoose.Schema 
let ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost/dbecommerce');
 
var productsSchema = new Schema({
    category    	: [{type:Schema.Types.ObjectId,ref:'Category'}],
    name    	: String,
    merek    	: String,
    type        : String,
    spec       : String,
    price		: Number,
    stock		: Number,
    imgUrl		: String,
    createdAt	: Date
});
var Product = mongoose.model('Product', productsSchema);
module.exports = Product