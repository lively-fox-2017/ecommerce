const express = require('express');
const router = express.Router();

const customerRoutes = require('./customers');
const itemRoutes = require('./items');

router.use('/customers', customerRoutes);
router.use('/items', itemRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Index'
  });
});

module.exports = router;
