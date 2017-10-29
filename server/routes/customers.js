const express = require('express');
const router = express.Router();
const customers = require('../controllers/customers');

router.get('/', customers.findAll)
router.post('/', customers.create)
router.put('/:id', customers.update)
router.delete('/:id', customers.delete)

module.exports = router;
