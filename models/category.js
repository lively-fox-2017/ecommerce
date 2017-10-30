let mongoose = require('mongoose');
let Schema = mongoose.Schema 
let ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost/dbecommerce');
var categorySchema = new Schema({
    category_name    	: String
});
var Category = mongoose.model('Categori', categorySchema);
module.exports = Category