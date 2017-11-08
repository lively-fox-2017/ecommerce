const Transaction = require('../model/transactions')
const helper = require('../helper/helper')

module.exports = {
  findAll: (req, res) => {
    // 'title' = asc by title, '-title' = desc by title
    Transaction.find().populate('user').populate('product').sort('user').then((rowsTransaction) => {
      res.status(200).json({
        message: "Tampil Semua Data Transaction",
        data: rowsTransaction
      })
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  },

  insert: (req, res) => {
    let user = helper.getUserId(req.body.user)
    Transaction(helper.dataTransaction(req.body, user)).save().then((rowTransactionInserted) => {
      res.status(200).json({
        message: "Berhasil Memasukan Data",
        data: rowTransactionInserted
      })
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  },

  delete: (req, res) => {
    Transaction.remove({_id: req.params.id}).then((rowDeleteTransaction) => {
      // console.log(rowDeleteTransaction);
      if (rowDeleteTransaction.result.n != 0){
        res.status(200).json({
          message: "Berhasil Hapus",
          data: rowDeleteTransaction
        })
      } else {
        res.status(400).json({
          message: "Maaf Id tersebut tidak ada"
        })
      }
    }).catch((reason) => {
      res.status(404).json({
        message: reason
      })
    })
  }
}
