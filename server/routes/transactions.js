const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/TransactionController');

router.get('/', TransactionController.fetchAll);
router.get('/:id', TransactionController.fetchById);
router.post('/', TransactionController.create);
router.delete('/:id', TransactionController.delete);

module.exports = router;
