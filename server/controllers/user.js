const user = require('../models/user.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
require('dotenv').config()
/*
## Catatn Pribadi:
** addUser => melakukan register user dimana password akan di enkripsi dengan bcrypt.
** loginUser => melakukan login untuk user yang telah terdaftar, dimana password akan di compare antara password yang diimput dengan password yang tersimpan di database. jika data sama maka akan dibuatkan Token dengan jwt yang kemudian untuk dilempar ke publik.
** getUser => untuk mendapatkan data user secara keseluruhan (Untuk keperluan admin saja)
** findUser => untuk mendapatkan data user berdasarkan Token yang dikirimkan, yang nanti Token tersebut akan dibuka dengan jwt dan diambil _id-nya sebagai acuan parameter (Untuk keperluan admin saja).
*/
const addUser = (req,res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);
  user.create({
    username:req.body.username,
    password:hash,
    email:req.body.email,
    role:req.body.role
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
// ============================================================
const loginUser = (req,res) => {
  user.findOne({username:req.body.username
  })
  .then(data =>{
    if (bcrypt.compareSync(req.body.password, data.password)) {
      var token = jwt.sign({
        id: data._id,
        password: data.password,
        username: data.username,
        email: data.email,
        role: data.role
      }, process.env.DB_HOST);
      console.log("masuk")
      res.send({
        token: token,
        role: data.role
      })
    }else{
      console.log("ga ada data")
      res.send('Ga ada Data')
    }
  })
  .catch((err) => {
    res.send({
      token: null
    })
  })
}
// ============================================================
const getUser = (req,res) => {
  user.find().then((data)=>{
    res.send(data)
  })
}
// ============================================================
const findUser = (req,res) => {
  console.log('ini tokennya', req.headers.token)
  if (!req.headers.token) {
    console.log('Tidak Valid');
  } else {
    let filter = jwt.verify(req.headers.token, process.env.DB_HOST,(err,decoded)=>{
      console.log(decoded.id);
      return decoded.id
    })
    user.findById({
      _id:filter
    }).then((user)=>{
      console.log('passwordnya', user.password);
      res.send(user)
    }).catch((err)=>{
      // res.send(err)
    })  
  }
}
// ============================================================
module.exports = {
  addUser,
  loginUser,
  getUser,
  findUser
}
