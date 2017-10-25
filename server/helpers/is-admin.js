'use strict'

const generateResponse = require('./../helpers/generate-response');

module.exports = (req, res, next) => {
	if (req.headers.user) {
		if (req.headers.user.role === 'admin') {
			next();
		} else {
			const response = generateResponse(401, 'do not have access', null, 'Authorization error');
			res.status(401).send(response);
		}
	} else {
		const response = generateResponse(401, 'have not signed up/signed in', null, 'Authentication error');
		res.status(401).send(response);
	}
}