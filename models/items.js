const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    "itemname" : String,
    "price" : Number,
    "category" : String,
    "stock" : Number
})

const Item = mongoose.model('Items', itemSchema)

class ItemCRUD {
    static findAll(cb){
        Item.find((err, items)=>{
            if(err) {
                cb(err)
            } else {
                cb(items)
            }
        })
    }

    static create(body, cb){
        let item = new Item(body)
        item.save()
        .then(item=>{
            cb(item)
        })
        .catch(err=>{
            cb(err)
        })
    }

    static update(params, body, cb){
        Item.findById(params)
            .then(item => {
                item.itemname = body.itemname || item.isbn;
                item.price = body.price || item.price;
                item.category = body.category || item.category;
                item.stock = body.stock || item.stock;
                item.save()
                    .then(item => {
                        cb(item)
                    })
            })
            .catch(err => {
                cb(err)
        })
    }

    static delete(params, cb){
        Item.findByIdAndRemove(params)
            .then((item) => {
                let message = {
                    msg: "Success remove",
                    item
                }
                cb(message)
            })
            .catch(err => {
                cb(err)
            })
    }

}

module.exports = ItemCRUD;