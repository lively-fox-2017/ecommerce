const express = require('express')
const model = require('../models/category')
const ObjectId = require('mongodb').ObjectId

class Category {
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
				"category_name"  : req.body.category_name
			}, (err,result) => {
			if(!err) {
				res.send(result)	
			} else {
				res.send(err)
			} 			
		})
	}
	static edit(req,res) {
		model.updateOne(
			{ 
				_id : ObjectId(req.params.id)
			}, 
			{ 
				$set: { 
                    "category_name"  : req.body.category_name
                    } 
			}, (err, result) => {
			if(!err) {
				res.send(result)
			} else {
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

module.exports = Category