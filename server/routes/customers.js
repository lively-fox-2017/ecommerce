const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

router.get('/', CustomerController.fetchAll);
router.get('/:id', CustomerController.fetchById);
router.post('/', CustomerController.create);
router.put('/:id', CustomerController.update);
router.delete('/:id', CustomerController.delete);

module.exports = router;
