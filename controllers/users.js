const jwt = require('jsonwebtoken');
const Models = require('../models/all-models');



class Controller{
  static register(req, res, next) {
    let result = {message:'Gagal', data:{}}
    Models.User.create({email:req.body.email, role:req.body.role, password:req.body.password},
      error=>{
        if(error){
          res.send(error)
        }else{
          result.message="Berhasil";
          res.send(result)
        }
    })
    
        //res.send('respond with a resource');
    }

    static login(req, res, next){
      let result = {message:'Gagal', data:{}}
      Models.User.findOne({email:req.body.email}, function(err, user){
        let result = {message:'Gagal', data:{}}
        if(err || !user){
          res.send(result)
        }else{
          if(req.body.password==user.password){
            result.message="Berhasil"
            result.data={jwt:jwt.sign({email : user.email, id:user._id}, process.env.JWTtoken)}
            res.send(result)
          }else{
            res.send(result)
          }
        }
      })
    }

    static checklogin(req, res, next){
      let result = {message:'Gagal', data:{}}
      jwt.verify(req.params.jwt, process.env.JWTtoken, function(err, decoded) {
        //console.log(decoded.foo) // bar
        if(err){
          res.send('not valid')
        }else{
          res.send('valid')
        }
      });
    }
}

module.exports = Controller;
