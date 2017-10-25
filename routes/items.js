var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Models = require('../models/all-models');

let result = {message:'Gagal', data:{}}

router.post('/insert', (req, res)=>{
  Models.Item.create({
    nama_barang:req.body.nama_barang,
    harga:req.body.harga,
    category:req.body.category,
    description:req.body.description || '',
    img_url:req.body.img_url || ''
  },
  err=>{
    if(err){
      console.log('err server');
      res.send(result);
    }else{
      console.log('berhasil server');
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
    console.log('err server');
    res.send(result)
  })
  .catch((err)=>{
    console.log('berhasil server');
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
