const models = require('../models/customers');

class Customers {
  static findAll(req, res){
    models.getCustomers((err, customers)=>{
      if(err){
        res.send(err)
      }
      res.json(customers)
    })
  }

  static create(req, res){
    models.addCustomer(req.body, (err, customer)=>{
      if (err) {
        res.send(err)
      }
      res.json('Success add customer')
    })
  }

  static update(req, res){
    models.updateCustomer(req.params, req.body, (err, customer)=>{
      if (err) {
        res.send(err)
      }
      res.json('Succes Update')
    })
  }

  static delete(req, res){
    models.deleteCustomer(req.params, (err, customer)=>{
      if (err) {
        res.send(err)
      }
      res.send('Success Delete From Customers')
    })
  }



}
module.exports = Customers;
