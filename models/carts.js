const mongoose = require('mongoose')

const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var cartSchema =  new Schema({
              nama_item: String,
              harga: String,
              jumlah: Number,
              img: String
             })

var Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart
