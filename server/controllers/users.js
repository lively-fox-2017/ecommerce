var User = require('../models/users');


class UserController{
  static getAll(req,res){
    User.find({},(err,result)=>{
      res.json(200,{msg:' list', data:result})
    })
  }

  static addNew(req,res){
    let insert={
      name: req.body.name,
      memberid:req.body.memberid,
      address:req.body.address,
      zipcode: req.body.zipcode,
      phone:req.body.phone
    }
    User.create(insert).then(result=>{
      res.json(200,{msg:'new ', data:result})
    })

  }

  static editData(req,res){
    let condition={
      _id : req.body.id
    }
    let newData={
        $set:{
          name: req.body.name,
          memberid:req.body.memberid,
          address:req.body.address,
          zipcode: req.body.zipcode,
          phone:req.body.phone
        }
      }
      User.update(condition,newData).then(result=>{
        res.json(200,{msg:"edited id", data:result})
        })
      }

  static deleteData(req,res){
    let condition={
      _id : req.body.id
    }
    User.findOneAndRemove(condition).then(result=>{
      res.json(200,{msg:"deleted id", data:result})
      })
    }





}

module.exports = UserController;
