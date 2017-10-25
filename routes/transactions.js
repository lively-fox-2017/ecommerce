var express = require('express');
var router = express.Router();

const ControllersTransaction = require('../controllers/transactions');

router.post('/new', ControllersTransaction.new)
router.get('/all', ControllersTransaction.getAll)

module.exports = router;
