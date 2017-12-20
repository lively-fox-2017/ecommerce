const models = require('../models/categories');

class CategoriesCtrl {

  static addCategories(req, res){
    models.addCategories(req, res)
  }

  static findAll(req, res){
    models.findAll(req, res)
  }

}
module.exports = CategoriesCtrl;
