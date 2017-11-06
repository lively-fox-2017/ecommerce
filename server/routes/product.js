var express = require('express');
var router = express.Router();
var ProductCtrl = require('../controllers/product')

/* GET home page. */
router.get('/', ProductCtrl.readAll)
router.get('/:id', ProductCtrl.readOne)
router.post('/', ProductCtrl.create)
router.put('/:id', ProductCtrl.update)
router.delete('/:id', ProductCtrl.delete)

module.exports = router;
