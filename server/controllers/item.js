'use strict'

const models = require('./../models');
const generateResponse = require('./../helpers/generate-response');

class Item {
	static findAll(req, res) {
		models.Item.find().exec()
		.then(items => {
			const response = generateResponse(200, `fetch all items`, items, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, `failed retrieving from database`, null, err);
			res.status(500).send(response);
		});
	}

	static findOne(req, res) {
		models.Item.findById(req.params.id).exec()
		.then(item => {
			const response = generateResponse(200, `fetch item with id ${req.params.id}`, item, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, `failed retrieving item with id ${req.params.id} from database`, null, err);
		});
	}

	static create(req, res) {
		const value = req.body;

		models.Item.create()
		.then(itemCreated => {
			const response = generateResponse(200, `create item`, itemCreated, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, `failed to save item to database`, null, err);
			res.status(500).send(response);
		});
	}

	static update(req, res) {
		const options = {_id: req.params.id};
		const value = req.body;

		models.Item.updateOne(options, value).exec()
		.then(() => {
			const response = generateResponse(200, `update item with id ${req.params.id}`, value, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, `failed to update item on database with id ${req.params.id}`, null, err);
			res.status(500).send(response);
		});
	}

	static delete(req, res) {
		const options = {_id: req.params.id};

		models.Item.deleteOne(options)
		.then(() => {
			const response = generateResponse(200, `delete item with id ${req.params.id}`, options, null);
			res.status(200).send(response);
		})
		.catch(err => {
			const response = generateResponse(500, `failed to delete item with id ${req.params.id}`, null, err);
			res.status(200).send(response);
		});
	}
}

module.exports = Item;