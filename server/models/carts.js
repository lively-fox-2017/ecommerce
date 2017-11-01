const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    "customers": { type: Schema.Types.ObjectId, ref: 'Customers'},
    "transactiondate": { type: Date, default: Date.now },
    "itemlist": [{ type: Schema.Types.ObjectId, price: Schema.Types.price, ref: 'Items' }]
})

const Cart = mongoose.model('Carts', cartSchema)

class CartCRUD{
    static findAll(cb){
        Cart.find()
        .populate("customers")
        .populate("itemlist")
        .then(cart=>{
            cb(cart)
        })
        .catch(err=>{
            cb(err)
        })
    }

    static create(body, cb){
        console.log(body);
        let cart = new Cart(body)
        cart.save()
            .then(cart => {
                cb(cart)
            })
            .catch(err => {
                cb(err)
            })
    }

    static update(params, body, cb){
        Cart.findById(params)
            .then(cart => {
                cart.customers = body.customers || cart.customers;
                cart.transactiondate = body.transactiondate || cart.transactiondate;
                cart.itemlist = body.itemlist || cart.itemlist;
                cart.save()
                    .then(cart => {
                        cb(cart)
                    })
            })
            .catch(err => {
                cb(err)
            })
    }

    static delete(params){
        Cart.findByIdAndRemove(params)
            .then((cart) => {
                let message = {
                    msg: "Success remove",
                    cart
                }
                cb(message)
            })
            .catch(err => {
                cb(err)
            })
    }
}

module.exports = CartCRUD;