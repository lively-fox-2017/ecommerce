const Transaction = require('../model/transactions')
const helper = require('../helper/helper')

module.exports = {
  findAll: (req, res) => {
    // 'title' = asc by title, '-title' = desc by title
    Transaction.find().populate('member').populate('booklist').sort('member').then((rowsTransaction) => {
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

  findOne: (req, res) => {
    Transaction.findOne({_id: req.params.id}).populate('member').populate('booklist').then((rowTransaction) => {
      if (rowTransaction) {
        res.json({
          message: "Tampil Satu Data Transaction",
          data: rowTransaction
        })
      } else {
        res.json({
          message: "Tidak ada Id transaksi tersebut"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  insert: (req, res) => {
    Transaction(helper.dataTransaction(req.body)).save().then((rowTransactionInserted) => {
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

  update: (req, res) => {
    Transaction.findOne({_id: req.params.id}).then((rowTransaction) => {
      if (rowTransaction) {
        if (!rowTransaction.in_date) {
          let fine = helper.countFine(new Date(), rowTransaction.due_date)

          Transaction.update({_id: req.params.id}, {$set: {in_date: new Date(), fine: fine}}).then((rowUpdateTransaction) => {
            res.json({
              message: "Berhasil Mengembalikan Buku",
              data: rowUpdateTransaction
            })
          }).catch((reason) => {
            res.json({
              message: reason
            })
          })
        } else {
          res.json({
            message: "Id tersebut telah mengembalikan buku"
          })
        }
      } else {
        res.json({
          message: "Data Tidak Ditemukan"
        })
      }
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
