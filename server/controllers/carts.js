const Cart = require('../models/carts')

class CartCRUD{
    static findAll(req, res){
        Cart.findAll((err, cart)=>{
            if(err) res.send(err)
            res.send(cart)
        })
    }

    static create(req, res){
        console.log(req.body);
        // res.send(req.body)
        Cart.create(req.body, (err, cart)=>{
            if(err) res.send(err)
            res.send(cart)
        })
    }

    static update(req, res) {
        Cart.update(req.params.id, req.body, (err, cart)=>{
            if(err) res.send(err)
            res.send(cart)
        })
    }

    static delete(req, res) {
        Cart.delete(req.params.id, (err, cart)=>{
            if(err) res.send(err)
            res.send(cart)
        })
    }
}

module.exports = CartCRUD;