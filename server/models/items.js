var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/yoyoi');
mongoose.connect('mongodb://user:puser@ds229435.mlab.com:29435/ecomlive');

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
