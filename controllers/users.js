const express = require('express')
const model = require('../models/users')
const ObjectId = require('mongodb').ObjectId
const tools = require('../helper/tools')
 
class Users {
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
		let salt = tools.getRand()
        let password = tools.getCrypt(req.body.password,salt)
		model.create(
			{
				username: req.body.username,
				password: password,
				salt: salt,
				role: req.body.role
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
					username: req.body.username,
					password: req.body.password,
					salt: req.body.salt,
					role: req.body.role
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
		model.findOne({ _id: ObjectId(req.params.id)}).then(user => {
			model.deleteOne({ _id: ObjectId(req.params.id) }, 
			(err, result) => {
			if(!err) {
				res.send(user)										
			} else {
				res.send(err)
			} 			
		});
		})
		.catch(err => {
			res.send(err)
		})
	}
}
module.exports = Users