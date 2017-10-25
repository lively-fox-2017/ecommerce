const Customer = require('../models/customers')

class CustomerCRUD {

    static findAll(req, res) {
        Customer.findAll((err, customers) => {
            if (err) res.status(500).send(err)
            res.status(200).send(customers)
        })
    }

    static create(req, res) {
        Customer.create(req.body, (err, person)=>{
            if (err) res.send(err).status(500)
            res.send(person).status(200)
        })
    }

    static update(req, res) {
        Customer.update(req.params.id, req.body, (err, person)=>{
            if(err) res.send(err)
            res.send(person)
        })
    }

    static delete(req, res) {
        Customer.delete(req.params.id,(err, message)=>{
            if(err) res.send(err)
            res.send(message)
        })
    }
}
module.exports = CustomerCRUD;