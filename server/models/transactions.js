var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yoyoi');
var Schema = mongoose.Schema;

var trxSchema = new Schema({
  item: {type:Schema.Types.ObjectId,ref:'Item'},
  total_item:Number,
  price:Number,
  order_date:Date,
  
});

var Transaction = mongoose.model('Transaction', trxSchema);

module.exports = Transaction;
