var Transaction = require('../models/transactions');
var moment = require('moment');


class TransactionController{
  static getAll(req,res){
    Transaction.find().populate('member').populate('booklist').then(result=>{
      res.json(200,{msg:'new book', data:result})
    })
  }

  static addNew(req,res){
    let insert={
      member: req.body.member,
      days:req.body.days,
      out_date:new Date(),
      due_date: moment(new Date()).add('days', req.body.days),
      booklist:req.body.booklist

    }
    Transaction.create(insert).then(result=>{
      res.json(200,{msg:'new book', data:result})
    })
  }

  static editData(req,res){
    let condition={
      _id : req.body.id
    }

    Transaction.findOne(condition).then(result=>{
      var a = moment(new Date());
      var b = moment(result.due_date);
      let fine= a.diff(b, 'days')*1000 //denda 1000 perhari
      let newData={
          $set:{
            in_date: new Date(),
            fine:fine
          }
        }
      Transaction.update(condition,newData).then(result=>{
        res.json(200,{msg:"edited id", data:result})
      })
    })
    }

  static deleteData(req,res){
    let condition={
      _id : req.body.id
    }
    Transaction.findOneAndRemove(condition).then(result=>{
      res.json(200,{msg:"deleted id", data:result})
      })

    }





}

module.exports = TransactionController;
