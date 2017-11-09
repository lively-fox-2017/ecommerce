const jwt = require('jsonwebtoken');
require('dotenv').config()

var auth = (req,res,next)=>{
  jwt.verify(req.headers.token, process.env.DB_HOST,(err,decoded)=>{
    if (!err) {
      
      req.role = decoded.role
      next()
    }
    else {
      res.send(err)
    }
  })
}

var authAdmin = (req,res,next)=>{

  if (req.role == 'admin') {
    next()
  }
  else {
    res.send('Anda bukan Admin')
  }
}

module.exports = {
  auth,
  authAdmin
};
