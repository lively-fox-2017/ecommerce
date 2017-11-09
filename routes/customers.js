const express = require('express');
const router = express.Router();
const Customer = require('../controllers/customers')


/* GET home page. */
router.get('/', Customer.findCustomers)
router.post('/', Customer.createCustomers)
router.delete('/:id', Customer.deleteCustomers)
router.put('/:id', Customer.updateCustomers)

module.exports = router;
