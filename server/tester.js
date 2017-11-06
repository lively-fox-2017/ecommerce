const crypto = require('crypto');
const secret = process.env.SALT_KEY;
const hash = crypto.createHmac('sha256', 'secret').update('plain').digest('hex');

console.log(hash);
