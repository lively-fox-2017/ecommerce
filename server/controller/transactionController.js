const Transaction = require('../model/transactions')
const helper = require('../helper/helper')

module.exports = {
  findAll: (req, res) => {
    // 'title' = asc by title, '-title' = desc by title
    Transaction.find().populate('user').populate('product').sort('user').then((rowsTransaction) => {
      res.json({
        message: "Tampil Semua Data Transaction",
        data: rowsTransaction
      })
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  insert: (req, res) => {
    let user = helper.getUserId(req.body.user)
    Transaction(helper.dataTransaction(req.body, user)).save().then((rowTransactionInserted) => {
      res.json({
        message: "Berhasil Memasukan Data",
        data: rowTransactionInserted
      })
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  delete: (req, res) => {
    Transaction.remove({_id: req.params.id}).then((rowDeleteTransaction) => {
      // console.log(rowDeleteTransaction);
      if (rowDeleteTransaction.result.n != 0){
        res.json({
          message: "Berhasil Hapus",
          data: rowDeleteTransaction
        })
      } else {
        res.json({
          message: "Maaf Id tersebut tidak ada"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  }
}
