'use strict'

const jwt = require('jsonwebtoken');

module.exports = (user) => {
	const data = {
		id: user._id,
		username: user.username,
		role: user.role
	}

	return jwt.sign(data, process.env.JWT_SECRET_KEY);
}