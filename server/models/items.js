var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yoyoi');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  brand: String,
  name:String,
  imgUrl:String,
  price: Number ,
  info:String,
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
