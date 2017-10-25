'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');

class Transaction {
	static create(req, res) {
		const value = req.body;

		models.Transaction.create(value)
		.then(transactionCreated => {
			const response = generateResponse(200, 'create transaction', transactionCreated, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, 'failed to save transaction to database', null, err);
			res.status(200).send(response);
		});
	}

	static findAll(req, res) {
		models.Transaction.find().exec()
		.then(transactions => {
			const response = generateResponse(200, 'fetch all transactions', transactions, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, 'failed retrieving transactions from database', null, err);
			res.status(500).send(response);
		});
	}
}

module.exports = Transaction;