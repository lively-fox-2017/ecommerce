var Item = require('../models/items');


class ItemController{
  static getAll(req,res){
    Item.find({},(err,result)=>{
      res.json(200,{msg:' list', data:result})
    })
  }

  static addNew(req,res){
    let insert={
      brand: req.body.brand,
      name:req.body.name,
      imgUrl:req.body.imgUrl,
      price: req.body.price,
      info: req.body.info,
    }
    Item.create(insert).then((result)=>{
      res.json(200,{msg:'new ', data:result})
    })
  }

  static editData(req,res){
    let condition={
      _id : req.body.id
    }
    let newData={
        $set:{
          isbn: req.body.isbn,
          title: req.body.title  ,
          author: req.body.author,
          category: req.body.category ,
          stock: req.body.stock
        }
      }
      Item.update(condition,newData).then(result=>{
        res.json(200,{msg:"edited id", data:result})
      })
      }

  static deleteData(req,res){
    let condition={
      _id : req.body.id
    }
    Item.findOneAndRemove(condition).then(result=>{
      res.json(200,{msg:"deleted id", data:result})
      })
      }





}

module.exports = ItemController;
