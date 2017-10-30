var jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  login: (req, res, next) => {
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
      console.log('ini adalah decoded ----->', decoded)
      if (err) {
        res.send(' anda harus login terlebih dahulu')
      }
      else {
        req.role = decoded.role
        next()
      }
    })
  },
  logAdmin: (req, res, next) => {
    if (req.role === 'admin') {
      next()
    }
    else {
      res.send('anda bukan admin')
    }
  }
}
