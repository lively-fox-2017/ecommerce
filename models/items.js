const mongoose = require('mongoose')

const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var customerSchema =  new Schema({
              id: String,
              nama_item: String,
              category: String,
              harga: String,
              jumlah: String,
              img: String
             })

var Item = mongoose.model('Item', customerSchema);
module.exports = Item
