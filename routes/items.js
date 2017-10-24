var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Models = require('../models/all-models');

let result = {message:'Gagal', data:{}}

router.post('/insert', (req, res)=>{
  Models.Item.create({nama_barang:req.body.nama_barang, harga:req.body.harga, category:req.body.category},
  err=>{
    if(err){
      res.send(result);
    }else{
      result.message = 'Berhasil';
      res.send(result)
    }
  })
})

router.get('/get', (req, res)=>{
  Models.Item.find({})
  .then((items)=>{
    result.message='Berhasil'
    result.data = items
    res.send(result)
  })
  .catch((err)=>{
    res.send(result)
  })
})

router.get('/delete/:id', (req, res)=>{
  Models.Item.remove({_id:mongoose.mongo.ObjectId(req.params.id)})
  .then((item)=>{
    console.log(item);
    
    result.message='Berhasil'
    result.data={}
    res.json(result)
  })
  .catch(err=>{
    console.log(err);
    res.send(result)
  })
})

module.exports = router;
