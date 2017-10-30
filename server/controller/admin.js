const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
  register: (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    let admin = new Admin({
      username: req.body.username,
      password: hash,
      role: 'admin'
    })
    admin.save((err, dataUser) => {
      if (err) {
        res.send(err)
      }
      else {
        res.send(dataUser)
      }
    })
  },
  login: (req, res) => {
    Admin.findOne({
      username: req.body.username
    }, (err, dataAdmin) => {
      if(err) {
        res.send('anda bukan admin')
        console.log(err)
      }
      else {
        var token = jwt.sign({
          id: dataAdmin._id,
          username: dataAdmin.username,
          role: dataAdmin.role
        }, process.env.SECRET)
        res.send(token)
      }
    })
  }
}
