var express = require('express');
var router = express.Router();
var CustomerCtrl = require('../controllers/customer')

/* GET home page. */
router.post('/login', CustomerCtrl.login)
router.post('/register', CustomerCtrl.register)

module.exports = router;
