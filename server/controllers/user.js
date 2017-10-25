'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');
const generateToken = require('./../helpers/generate-token');

class User {
	static signup(req, res) {
		const value = {
			username: req.body.username,
			password: req.body.password,
			role: 'user'
		}

		models.User.create(value)
		.then(userCreated => {
			const data = {
				user_created: userCreated,
				jwtoken: generateToken(userCreated)
			};

			const response = generateResponse(200, 'sign up success', data, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, 'sign up failed', null, err);
			res.status(500).send(response);
		});
	}

	static signin(req, res) {
		const option = {username: req.body.username};
		let signedInUser = null;

		models.User.findOne(option).exec()
		.then(user => {
			signedInUser = user;

			// return a promise, resolve only if the password is matched
			// reject if error or password do not match
			return user.comparePassword(req.body.password);
		})
		.then(isMatch => {
			const data = {
				jwtoken: generateToken(signedInUser)
			};

			const response = generateResponse(200, 'signin success', data, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, 'signin failed', null, err);
			res.status(500).send(response);
		});
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