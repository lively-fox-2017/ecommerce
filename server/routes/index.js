const express = require('express');
const router = express.Router();

const customerRoutes = require('./customers');

router.use('/customers', customerRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Index'
  });
});

module.exports = router;
