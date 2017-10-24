const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/productCtrl');

router.get('/:category', ProductCtrl.getProductbyCategory);

module.exports = router;
