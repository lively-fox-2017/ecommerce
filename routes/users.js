var express = require('express');
var router = express.Router();
const Models = require('../models/all-models');

let result = {message:'Gagal', data:{}}

/* GET users listing. */
router.post('/register', function(req, res, next) {
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
});

router.post('/login', function(req, res, next){
  Models.User.findOne({email:req.body.email}, function(err, user){
    if(err || !user){
      res.send(result)
    }else{
      if(req.body.password==user.password){
        result.message="Berhasil",
        res.send(result)
      }else{
        res.send(result)
      }
    }
  })
})

module.exports = router;
