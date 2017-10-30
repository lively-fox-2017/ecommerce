const jwt = require('jsonwebtoken');
const createHash=require('../helper/hash');
const signinFB = require('../models/signinFB');
const signin = require('../models/user');

class Signin {
  static signinFB(req,res,next){
    signinFB.signin(req.body)
    .then(data=>{
      res.status(200).json(data);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static signin(req,res,next){
    if (req.body.username=='' || req.body.password=='') {
      res.status(400).send('username/password anda kosong!')
    } else {
      signin.findOne({
        username:req.body.username
      })
      .then(rows=>{
        let salt=process.env.APPSECRET+rows.salt;
        if (rows.password==createHash(req.body.password,salt)) {
          var token = jwt.sign({
            username:rows.username,
            email:rows.email,
            imageUrl: rows.imageUrl,
          }, salt);
          res.json({
            message:"Login sukses",
            token:token,
            role:rows.role
          })
        } else {
          res.status(400).send('Maaf password anda salah!')
        }
      })
      .catch(err=>{
        res.status(400).send('Maaf user anda tidka terdaftar!')
      })
    }
  }
}

module.exports = Signin
