const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
  item_Name:{
    type: String
  },
  item_Qty:{
    type: Number
  },
  item_Price:{
    type: Number
  },
  total_price:{
    type: Number
  },
  img:{
    type: String
  }
})

let items = mongoose.model('Items', itemSchema);

class ItemsModel {

  static getItems(req, res) {
    items.find()
    .then((dataItems) => {
      res.status(200).json({dataItems})
    }).catch((err) => {
      res.status(400).send(err)
    })
  };

  static addItem(req, res) {
    var data_item = new items(req.body)
    data_item.save().then((dataItems) => {
      res.status(200).json({dataItems})
    }).catch((err) => {
      res.status(400).send(err)
    })
  };

  static updateItem(req, res) {
    items.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then((updatedItem) => {
      res.json({message: 'Succesfully Updated Item', updatedItem})
    }).catch((err) => {
      res.send(err);
    })
  }

  static deleteItem(req, res) {
    items.remove({_id : req.params.id})
      .then((result) => {
      res.json({ message: "items successfully deleted!", result });
    })
    .catch((err) => {
      res.send(err)
    })
  }

}
module.exports = ItemsModel;
