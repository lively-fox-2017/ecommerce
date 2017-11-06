var express = require('express');
var router = express.Router();
var CustomerCtrl = require('../controllers/customer')

/* GET home page. */
router.get('/', CustomerCtrl.readAll)
router.get('/:id', CustomerCtrl.readOne)
router.post('/', CustomerCtrl.create)
router.put('/:id', CustomerCtrl.update)
router.delete('/:id', CustomerCtrl.delete)

module.exports = router;
