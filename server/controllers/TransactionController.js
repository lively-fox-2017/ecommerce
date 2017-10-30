const Transaction = require('../models/Transaction');

class TransactionController {

  static fetchAll (req, res) {

    const execQuery = Transaction.find({})
                        .sort('-date')
                        .populate('customer')
                        .populate('itemList');

    execQuery
      .then((transactions) => {

        res.status(200).json(transactions || []);

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static fetchById (req, res) {

    const execQuery = Transaction
                        .findById(req.params.id)
                        .populate('customer')
                        .populate('itemList');

    execQuery
      .then((transaction) => {

        if (transaction)
          res.status(200).json(transaction);
        else
          res.status(404).json({});

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static create (req, res) {

    const newTransaction = {
      customer: req.body.customer,
      itemList: req.body.itemList,
      total: req.body.total
    };

    const execQuery = Transaction.insertMany(newTransaction);

    execQuery
      .then((transaction) => {

        res.status(201).json(transaction);

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static delete (req, res) {

    const findQuery = Transaction.findById(req.params.id);

    findQuery
      .then((transaction) => {

        if (!transaction) {

          res.status(404).json({});

        } else {

          const deleteQuery = Transaction.deleteOne({ _id: transaction.id });

          deleteQuery
            .then((status) => {

              res.status(200).json({
                status: status,
                transaction: transaction
              });

            })
            .catch((err) => {

              res.status(400).json(err);

            });

        }

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

}

module.exports = TransactionController;
