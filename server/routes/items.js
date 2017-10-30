var express = require('express');
var router = express.Router();
var ItemController = require('../controllers/items')


router.get('/', ItemController.getAll )

router.post('/', ItemController.addNew )

router.put('/', ItemController.editData )

router.delete('/', ItemController.deleteData )


module.exports = router;
