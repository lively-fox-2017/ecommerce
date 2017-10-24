const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const URL = 'mongodb://localhost:27017/learning-ecommerce'
mongoose.Promise = global.Promise;
mongoose.connect(URL);

let productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String,
  },
  'createdAt': {
    type: Date,
    default: Date.now
  },
  'updatedAt': {
    type: Date,
    default: Date.now
  }
})

productSchema.pre('save', function(next) {
  this.createdAt = Date.now();
})

productSchema.pre('update', function(next) {
  this.findOne({
      _id: this._conditions._id
    })
    .then(value => {
      this.updateOne({
          _id: this._conditions._id
        }, {
          updatedAt: Date.now()
        })
        .then(() => {
          next();
        })
        .catch(reason => {
          console.log(reason);
        });
    })
    .catch(reason => {
      console.log(reason);
    })
})

module.exports = mongoose.model('Product', productSchema);
