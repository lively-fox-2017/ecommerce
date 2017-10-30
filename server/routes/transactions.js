var express = require('express');
var router = express.Router();
var TransactionController = require('../controllers/transactions')


router.get('/', TransactionController.getAll )

router.post('/', TransactionController.addNew )

router.put('/', TransactionController.editData )

router.delete('/', TransactionController.deleteData )


module.exports = router;
