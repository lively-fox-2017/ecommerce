const Item = require('../models/items');

class ItemCRUD {
    constructor() {
        
    }

    static findAll(req, res){
        Item.findAll((items, err)=>{
            if(err) res.send(err)
            res.send(items)
        })
    }

    static create(req, res){
        Item.create(req.body, (item, err)=>{
            if(err) res.send(err)
            res.send(item)
        })
    }

    static update(req, res){
        Item.update(req.params.id, req.body, (item, err)=>{
            if(err) res.send(err)
            res.send(item)
        })
    }

    static delete(req, res){
        Item.delete(req.params.id, (item, err)=>{
            if(err) res.send(err)
            res.send(item)
        })
    }
}

module.exports = ItemCRUD;