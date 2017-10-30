var mongoose = require('mongoose');
var Schema= mongoose.Schema,
    ObjectId=Schema.ObjectId;

  var Item=new Schema({
      id:String,
      name:String,
      description:String,
      img:String,
      price:Number,
      stock:Number
  })

var dataItem = mongoose.model('dataItem',Item)

module.exports = dataItem;
