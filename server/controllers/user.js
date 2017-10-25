'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');

class User {
	static signup(req, res) {
		const response = generateResponse(200, 'service is not available yet', null, null);
		res.status(200).send(response);
	}

	static signin(req, res) {
		const response = generateResponse(200, 'service is not available yet', null, null);
		res.status(200).send(response);
	}

	static findAll(req, res) {
		models.User.find().exec()
		.then(users => {
			const response = generateResponse(200, 'fetch all users', users, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, 'failed retrieving users from database', null, err);
			res.status(500).send(response);
		});
	}

	static create(req, res) {
		const value = req.body;

		models.User.create(value)
		.then(userCreated => {
			const response = generateResponse(200, 'create user', userCreated, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, 'failed to save user to database', null, err);
			res.status(500).send(response);
		});
	}

	static delete(req, res) {
		const options = {_id: req.params.id};

		models.User.deleteOne(options)
		.then(() => {
			const response = generateResponse(200, `delete user with id ${req.params.id}`, options, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, `failed to delete user with id ${req.params.id} from database`, null, err);
			res.status(200).send(response);
		});
	} 
}

module.exports = User;