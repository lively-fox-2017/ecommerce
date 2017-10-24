var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users')


router.get('/', UserController.getAll )

router.post('/', UserController.addNew )

router.put('/', UserController.editData )

router.delete('/', UserController.deleteData )


module.exports = router;
