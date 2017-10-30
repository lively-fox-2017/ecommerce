const Transaction = require('../models/transaction');
const jwt = require('jsonwebtoken');

class TransactionCtrl {
  static add(req, res, next) {
    let decode = jwt.decode(req.body.token)
    let newTransaction = new Transaction({
      customer: decode.id,
      orders: req.body.orders,
    });
    newTransaction.save()
      .then((newItem) => {
        res.status(200).json(newItem);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }
}

module.exports = TransactionCtrl;
