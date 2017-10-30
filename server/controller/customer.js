const Customer = require('../models/customer')

module.exports = {
  all: (req, res) => {
    Customer.find((err, dataCustomer) => {
      if (err) {
        res.send(err)
      } else {
        res.send(dataCustomer)
      }
    })
  },
  create: (req, res) => {
    let customer = new Customer({
      nama: req.body.nama,
      alamat: req.body.alamat,
      jenisKelamin: req.body.jenisKelamin,
      codePos: req.body.codePos
    })
    customer.save((err, dataCustomer) => {
      if (err) {
        res.send(err)
      } else {
        res.send(dataCustomer)
      }
    })
  },
  remove: (req, res) => {
    Customer.remove({ _id: req.params.id}, (err, dataCustomer) => {
      if (err) {
        res.send(err)
      } else {
        res.send(dataCustomer)
      }
    })
  }
}
