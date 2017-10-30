var Product = require('../models/product')

class ProductController {
    static getEditPage(req,res) {
        Product.findOne({_id: req.params.id})
        .then((Product,err) => {
            if(err) return res.send(err)
            res.send(Product)
            // res.render('editProduct', {title: 'Edit Products', Product:Product})
        })
    }

    static get(req,res) {
        Product.find({})
        .then((Product,err) => {
          if(err) {
            res.send(err)
          }
          res.send(Product)          
        //   res.render('Products', {title: 'Products', Products:Product})
        })
    }

    static post(req,res) {
        // res.send(req.body)
        var product = new Product({
            name: req.body.name,
            img: req.body.img,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
          })
        // res.send(product)
          product.save()
          .then((result, err) => {
            if(err) {
              res.send(err)
            }
            res.send(result)
            
            // res.redirect('/Products')
          })
    }

    static update(req,res) {
        Product.findOneAndUpdate({_id: req.params.id},{
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            stock: req.body.stock
        })
        .then((Product,err) => {
            if(err) return res.send(err)
            res.send(Product)
            
            // res.redirect('/Products')
        })
    }

    static delete(req,res) {
        Product.findOneAndRemove({_id: req.params.id})
        .then((Product,err) => {
            if(err) return res.send(err)


            res.send(Product)
            
            // res.redirect('/Products')
        })
    }
}

module.exports = ProductController