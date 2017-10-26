const express = require('express');
const router = express.Router();

const customerRoutes = require('./customers');
const itemRoutes = require('./items');
const transactionRoutes = require('./transactions');

router.use('/customers', customerRoutes);
router.use('/items', itemRoutes);
router.use('/transactions', transactionRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Index'
  });
});

module.exports = router;
