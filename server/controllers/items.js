const models = require('../models/items');

class Items {
  static findAll(req, res){
    models.getItems((err, items)=>{
      if(err){
        res.send(err)
      }
      res.json(items)
    })
  }

  static create(req, res){
    console.log(req.body.named);
    models.addItem(req.body, (err, item)=>{
      if (err) {
        res.send(err)
      }
      res.json(item)
    })
  }

  static update(req, res){
    models.updateItem(req.params, req.body, (err, item)=>{
      if (err) {
        res.send(err)
      }
      res.json('Success Update')
    })
  }

  static delete(req, res){
    models.deleteItem(req.params, (err, item)=>{
      if (err) {
        res.send(err)
      }
      res.send('Success Delete From Items')
    })
  }

}
module.exports = Items;
