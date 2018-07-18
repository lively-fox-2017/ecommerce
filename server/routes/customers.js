const express = require('express');
const router = express.Router();
const Customers = require('../controllers/customers')
// const db = "mongodb://127.0.0.1:27017/mongoose-library"


router.post('/', Customers.create)

router.get('/', Customers.findAll)

router.put('/:id', Customers.update)

router.delete('/:id', Customers.delete)

module.exports = router;