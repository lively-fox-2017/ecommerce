var Transaction = require('../models/transaction')
var Customer = require('../models/customer')
var Product = require('../models/product')
var jwt = require('jsonwebtoken');


class collectionCtrl{
    static get(req,res) {
        console.log(req.query.token)
        var opentoken = jwt.verify(req.query.token, 'secret')
        console.log(opentoken)
        Transaction.findOne({member:opentoken._id})
        .populate('items')
        .populate('member')
        .then((collection,err) => {
            console.log(collection)
            res.send(collection)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getEditPage(req,res) {
        Transaction.findOne({_id: req.params.id})
        .populate('member')
        .populate('booklist')
        .then((collection,err) => {
            Customer.find({})
            .then((customer,err) => {
                Book.find({})
                .then((book, err) => {
                    if(err) {
                        res.send(err)
                    }

                    res.render('editTransaction', {title: 'Transaction', transaction: collection, members: customer, books:book})
                })
                .catch(err => {
                    res.send(err)
                })
            })
            .catch(err => {
                res.send(err)
            })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static post(req,res) {
        console.log(req.body)
        var opentoken = jwt.verify(req.body.token, 'secret'); 
        console.log(opentoken)
        var items = []
        var total = 0
        req.body.cart.forEach(i => {
            items.push(i._id)
            total += i.price
        }) 
        console.log(items)
        console.log(total)
        Transaction.findOne({member: opentoken._id})
        .then(response => {
            console.log(response)
            if(response === null) {
                var transaction = new Transaction({
                    member: opentoken._id,
                    total: total,
                    items: items
                })
                transaction.save()
                .then((result, err) => {
                    if(err) return res.send(err)

                    res.send({
                        result: result,
                        message: 'transaksi berhasil disimpan'
                    })
                })
                console.log(transaction)
            } else {
                res.send(false)
            }
        }) 
        .catch(err => {
            console.log(err)
        })   
        // if(req.body.member && req.body.days && req.body.fine && req.body.booklist && req.body.inDate && req.body.dueDate && req.body.outDate !== '') {
        //     var collection = new Collection({
        //         member: req.body.member,
        //         days: req.body.days,
        //         out_date: req.body.outDate,
        //         due_date: req.body.dueDate,
        //         in_date: req.body.inDate,
        //         fine: req.body.fine,
        //         booklist: req.body.booklist
        //     })
        //     // res.send(collection)
        //       Transaction.save()
        //       .then((result, err) => {
        //         if(err) {
        //           res.send(err)
        //         }
        //         res.send({
        //             message: 'Collection has been added',
        //             added: result
        //         })
        //       })
        // }
    }

    static update(req,res) {
        if(req.body.member && req.body.days && req.body.fine && req.body.booklist !== '') {
            Transaction.findOneAndUpdate({_id: req.params.id},{
                member: req.body.member,
                days: req.body.days,
                out_date: req.body.outDate,
                due_date: req.body.dueDate,
                in_date: req.body.inDate,
                fine: req.body.fine,
                booklist: req.body.booklist
            })
            .then((result,err) => {
                if(err) return res.send(err)

                res.redirect('/collections')
            })
        } else {
            res.redirect('/collections')
        }
    }

    static delete(req,res) {
        Transaction.findOneAndRemove({_id: req.params.id})
        .then((transaction,err) => {
            if(err) return res.send(err)

            res.redirect('/collections')
        })
    }
}

module.exports = collectionCtrl