const express = require('express')
const model = require('../models/products')
const ObjectId = require('mongodb').ObjectId

class Products {
	static findAll(req,res) {
		model.find({}, (err,docs) => {
			if(!err) {
				res.send(docs)	
			} else {
				res.send(err)
			} 			
		})
	}
	static findById(req,res) {
		model.find({_id:ObjectId(req.params.id)}, (err,doc) => {
			if(!err) {
				res.send(doc)	
			} else {
				res.send(err)
			} 			
		})
	}
	static add(req,res) {
		model.create(
			{
				"categori"  : req.body.categori,
				"name"  	: req.body.name,
				"merek" 	: req.body.merek,
				"type" 	    : req.body.type,
				"spec" 	    : req.body.spec,
				"price"		: req.body.price,
				"stock"		: req.body.stock,
				"imgUrl"		: req.body.imgUrl,
				"createAt"		: req.body.createAt
			}, (err,result) => {
			if(!err) {
				res.send(result)	
			} else {
				res.send(err)
			} 			
		})
	}
	static edit(req,res) {
		console.log('ada request edit ')
		console.log('bodynya ', req.body)
		console.log('params nya ', req.params)
		model.updateOne(
			{ 
				_id : ObjectId(req.params.id)
			}, 
			{ 
				$set: { 
                    "categori"  : req.body.categori,
                    "name"  	: req.body.name,
                    "merek" 	: req.body.merek,
                    "type" 	    : req.body.type,
                    "spec" 	    : req.body.spec,
                    "price"		: req.body.price,
                    "stock"		: req.body.stock,
                    "imgUrl"		: req.body.imgUrl,
                    "createAt"		: req.body.createAt
                    } 
			}, (err, result) => {
			if(!err) {
				console.log('yeay ', result)
				res.send(result)
			} else {
				console.log('errr ', err)
				res.send(err)
			}
		}) 
	}
	static delete(req,res) {
		model.deleteOne({ _id: ObjectId(req.params.id) }, 
			(err, result) => {
			if(!err) {
				res.send(result)	
			} else {
				res.send(err)
			} 			
		});
	}
}
module.exports = Products