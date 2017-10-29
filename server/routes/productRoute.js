const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/productCtrl');

router.get('/', ProductCtrl.getProducts);
router.get('/:category', ProductCtrl.getProductbyCategory);
router.post('/add_product', ProductCtrl.addProduct);
router.put('/update_product/:productId', ProductCtrl.updateProduct);
router.delete('/delete_product/:productId', ProductCtrl.deleteProduct);

module.exports = router;
