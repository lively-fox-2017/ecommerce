const Book = require('../models/books')

class Books {

  static findBooks(req,res){
    Book.find({})
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static createBooks(req,res){
    let newBooks = Book({
      "isbn": req.body.isbn,
      "title":req.body.title,
      "author":req.body.author,
      "category":req.body.category,
      "stock":req.body.stock
    })
      newBooks.save()
      .then(data=>{
      res.send({
        "Message": "Data Berhasil di Tambah",
        "isbn": req.body.isbn,
        "title":req.body.title,
        "author":req.body.author,
        "category":req.body.category,
        "stock":req.body.stock
       });
      })
      .catch(err=>{
      res.send(err)
      })
    }


  static deleteBooks(req,res){
    Book.findOneAndRemove({_id: req.params.id})
    .then(data=>{
      res.send({
        "message": "Data Berhasil di Delete!",
        data: req.params.id
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static updateBooks(req,res){
    Book.findByIdAndUpdate({_id: req.params.id}, {
      "isbn": req.body.isbn,
      "title":req.body.title,
      "author":req.body.author,
      "category":req.body.category,
      "stock":req.body.stock
    })
    .then(data=>{
      res.send({
        "message": "Data Berhasil di Update!",
        "isbn": req.body.isbn,
        "title":req.body.title,
        "author":req.body.author,
        "category":req.body.category,
        "stock":req.body.stock
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }
}

module.exports = Books
