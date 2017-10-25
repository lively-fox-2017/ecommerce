var express = require('express');
var router = express.Router();
const ControllersUsers = require('../controllers/users');



/* GET users listing. */
router.post('/register', ControllersUsers.register);

router.post('/login', ControllersUsers.login);

router.get('/checklogin/:jwt', ControllersUsers.checklogin)

module.exports = router;
