const models = require('../models/items');

class ItemsCtrl {
  static getItems(req, res){
    models.getItems(req, res)
  }

  static addItem(req, res){
    models.addItem(req, res)
  }

  static updateItem(req, res){
    models.updateItem(req, res)
  }

  static deleteItem(req, res){
    models.deleteItem(req, res)
  }

}
module.exports = ItemsCtrl;
