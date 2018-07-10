const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriesSchema = new Schema({
  category_name:{
    type: String
  },
  item_id :[{
    type: Schema.Types.ObjectId, ref: 'Items'
  }],
})

let categories = mongoose.model('Categories', categoriesSchema);

class CategoriesModel {

  static addCategories(req, res){
    let newCategory = new categories(req.body)
    newCategory.save().then((dataCategories) => {
      res.status(200).json({ dataCategories })
    }).catch((err) => {
      res.status(400).send(err)
    })

  }

  static findAll(req, res){
    categories.find()
    .populate('item_id')
    .then((dataCategories) => {
      res.status(200).json({dataCategories})
    }).catch((err) => {
      res.status(400).send(err)
    })
  }
}

module.exports = CategoriesModel;
