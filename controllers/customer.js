var Customer = require('../models/customer')
var jwt = require('jsonwebtoken');

class customerCtrl{

    static getAddPage(req,res) {
        res.render('addCustomer', {title: 'Add a customer'})
    }

    static getEditPage(req,res) {
        Customer.findOne({_id: req.params.id})
        .then((user, err) => {
            // res.send(user)
            res.render('editCustomer', {title: 'Edit Customer', user:user})
        })
    }

    static get(req,res) {
        Customer.find({})
        .then((customer,err) => {
          if(err) {
            res.send(err)
          }
          res.send(customer)
        //   res.render('customers', {title: 'Customers', customers: customer})
        //   res.send({
        //       message: 'customer list has been loaded',
        //       list: customer
        //   })
        })
    }

    static post(req,res) {
        console.log(req.body)
        if(req.body.name && req.body.password && req.body.email !== '') {
            var customer = new Customer({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
            console.log(customer)
            // res.send(customer)
              customer.save()
              .then((result, err) => {
                if(err) {
                  res.send(err)
                }
                console.log('halo')
                res.send({
                    message: 'Successfully created user',
                    data: result
                })
              })
        }
    }

    static login(req,res) {
        if(req.body.name && req.body.password !== '') {
            Customer.findOne({name: req.body.name})
            .then((user,err) => {
                if(err) return res.send(err)

                if(user === null) {
                    console.log('Hayolo gaada')
                    return res.send(false)
                }
                if(user.password == req.body.password) {
                    var token = jwt.sign({
                                    _id: user._id,
                                    name: user.name,
                                    email: user.email
                                }, 'secret');
                    console.log(token)
                    // var opentoken = jwt.verify(token, 'secret');      
                    // console.log(opentoken)      
                    return res.send(token)
                }
                res.send(false)
            })
        }
    }

    static update(req,res) {
        if(req.body.name === '' || req.body.name !== undefined) {
            Customer.findOneAndUpdate({name: req.body.oldName, password: req.body.oldPassword},{
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
            .then((user,err) => {
                if(err) return res.send(err)

                res.send({
                    message: 'Edit user berhasil',
                    user: user
                })
            })
        }
        // Customer.findOne({name: req.body.oldName, password: req.body.oldPassword})
        // .then(user => {
        //     console.log(user)
        // })
    }

    static delete(req,res) {
        console.log(req.params.id)
        Customer.findOneAndRemove({_id: req.params.id})
        .then((user,err) => {
            if(err) return res.send(err)
            
            res.redirect('/customers')
        })
    }
}

module.exports = customerCtrl