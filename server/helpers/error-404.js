'use strict'

const generateResponse = require('./../helpers/generate-response');

module.exports = (req, res, next) => {
	const response = generateResponse(404, 'there is no such endpoint in this great big world', null, 'error 404');
	res.status(404).send(response);
};