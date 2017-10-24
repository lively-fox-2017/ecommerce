var Transaction = require('../models/transaction')
var Customer = require('../models/customer')
var Product = require('../models/product')


class collectionCtrl{
    static get(req,res) {
        Transaction.find({})
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
                    res.send(collection)
                    // res.render('transaction', {title: 'Transaction', transaction: collection, members: customer, books:book})
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
        if(req.body.member && req.body.days && req.body.fine && req.body.booklist && req.body.inDate && req.body.dueDate && req.body.outDate !== '') {
            var collection = new Collection({
                member: req.body.member,
                days: req.body.days,
                out_date: req.body.outDate,
                due_date: req.body.dueDate,
                in_date: req.body.inDate,
                fine: req.body.fine,
                booklist: req.body.booklist
            })
            // res.send(collection)
              Transaction.save()
              .then((result, err) => {
                if(err) {
                  res.send(err)
                }
                res.send({
                    message: 'Collection has been added',
                    added: result
                })
              })
        }
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