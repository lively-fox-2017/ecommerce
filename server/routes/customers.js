const express = require('express');
const router = express.Router();
const customers = require('../controllers/customerCtrl');

router.post('/register', customers.register)
router.post('/login', customers.login)

module.exports = router;
