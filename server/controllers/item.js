const dataItem= require('../models/item')

let insertItem=function(req,res){
  dataItem.create({
    id:req.body.id,
    name:req.body.name,
    description:req.body.description,
    img:req.body.img,
    price:req.body.price,
    stock:req.body.stock
  },function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

let viewItem=function(req,res){
  dataItem.find({},function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

let deleteItem=function(req,res){
  dataItem.findByIdAndRemove(req.params.id,function(err){
    if(!err){
      res.send('data sudah Dihapus')
    }else{
      res.send(err)
    }
  })
}

let updateItem=function(req,res){
  dataItem.findByIdAndUpdate(req.params.id,{
    id:req.body.id,
    name:req.body.name,
    description:req.body.description,
    img:req.body.img,
    price:req.body.price,
    stock:req.body.stock
  },function(err,result){
    if(!err){
      res.send('data Sudah D Edit Bossku')
    }else{
      res.send(err)
    }
  })
}

module.exports = {
  insertItem,
  viewItem,
  deleteItem,
  updateItem
};
