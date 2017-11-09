const mongoose = require('mongoose')

const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var itemSchema =  new Schema({
              nama_item: String,
              category: String,
              harga: String,
              jumlah: String,
              img: String
             })

var Item = mongoose.model('Item', itemSchema);
module.exports = Item
