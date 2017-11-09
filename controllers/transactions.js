const Transaksi = require('../models/transactions')

class Transaction {

  static findTransaction(req,res){
    Transaksi.find({})
    .populate('member')
    .populate('booklist')
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static createTransaction(req,res){
    let newTransaction = Transaksi({
      "member": req.body.member,
      "days":req.body.days,
      "out_date": new Date(),
      "due_date": new Date(),
      "in_date": new Date(),
      "fine":req.body.fine,
      "booklist":req.body.booklist,
    })
    newTransaction.save()
    .then(data=>{
      res.send({
        "Message": "Data Berhasil di Tambah",
        "member": req.body.member,
        "days":req.body.days,
        "out_date":req.body.out_date,
        "due_date":req.body.due_date,
        "in_date":req.body.in_date,
        "fine":req.body.fine,
        "booklist":req.body.booklist,
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static deleteTransaction(req,res){
    Transaksi.findOneAndRemove({ _id: req.params.id })
    .then(data=>{
      res.send({
        "message": "Data Berhasil di Delete!",
        data: data
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static updateTransaction(req,res){
    Transaksi.findOneAndUpdate({_id: req.params.id}, {
      "member": req.body.member,
      "days":req.body.days,
      "out_date": new Date(),
      "due_date": new Date(),
      "in_date": new Date(),
      "fine":req.body.fine,
      "booklist":req.body.booklist
    })
    .then(data=>{
      res.send({
        "message": "Data Berhasil di Update!",
        "member": req.body.member,
        "days": req.body.days,
        "out_date": req.body.out_date,
        "due_date": req.body.due_date,
        "in_date": req.body.in_date,
        "fine": req.body.fine,
        "booklist": req.body.booklist
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }
}

module.exports = Transaction
