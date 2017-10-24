const Item = require('../models/items');

class ItemCRUD {
    constructor() {
        
    }

    static findAll(req, res){
        Item.findAll((err,items)=>{
            if(err) res.send(err)
            res.send(items)
        })
    }

    static create(req, res){
        Item.create(req.body, (err, item)=>{
            if(err) res.send(err)
            res.send(item)
        })
    }

    static update(req, res){
        Item.update(req.params.id, req.body, (err, item)=>{
            if(err) res.send(err)
            res.send(item)
        })
    }

    static delete(req, res){
        Item.delete(req.params.id, (err, item)=>{
            if(err) res.send(err)
            res.send(item)
        })
    }
}

module.exports = ItemCRUD;