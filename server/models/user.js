'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	username: String,
	password: String,
	role: String
});

// hash the password before user is saved to the database
UserSchema.pre('save', function(next) {
	let user = this;

	bcrypt.hash(user.password, 8, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

// validate password
UserSchema.methods.comparePassword = function(password) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, this.password, function(err, isMatch) {
    	if (err) reject(err);
    	else if (!isMatch) reject('wrong password');
    	else resolve(isMatch)
  	});
	});
};

module.exports = mongoose.model('User', UserSchema);