const express = require('express');
const router = express.Router();
const TransactionCtrl = require('../controllers/transactionCtrl');

router.post('/add', TransactionCtrl.add);

module.exports = router;
