const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    "name": { type:String, required: true },
    "memberid": String,
    "address": String,
    "zipcode": String,
    "phone": String
})

const Customer = mongoose.model('Customers', customerSchema)

class CustomerCRUD {
    constructor() {
        
    }

    static findAll(cb){
        Customer.find((err, customers)=>{
            if(!err){
                cb(customers)
            } else {
                cb(err)
            }
        })
    }

    static create(body, cb){
        let cust = new Customer(body)
        cust.save()
        .then(person=>{
            cb(person)
        })
        .catch(err=>{
            cb(err)
        })
    }

    static update(params, body, cb){
        Customer.findById(params)
            .then(person=>{
                console.log(person);
                person.name = body.name || person.name;
                person.memberid = body.memberid || person.memberid;
                person.address = body.address || person.address;
                person.zipcode = body.zipcode || person.zipcode;
                person.phone = body.phone || person.phone;
                person.save()
                .then(person=>{
                    console.log('masuk gak',person);
                    cb(person)
                })
            })
            .catch(err=>{
                console.log('masuk gak',err);
                cb(err)
            })
    }

    static delete(params, cb){
        Customer.findByIdAndRemove(params)
            .then((person) => {
                let message = {
                    msg: "Success remove",
                    person
                }
                cb(message)
            })
            .catch(err => {
                cb(err)
            })
    }
}

module.exports = CustomerCRUD;