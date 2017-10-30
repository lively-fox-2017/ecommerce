var express = require('express');
var router = express.Router();
const signup = require('../controller/signup')

/* GET users listing. */
router.post('/',signup.create);


module.exports = router;
