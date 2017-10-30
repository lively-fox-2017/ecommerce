const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/authCtrl');

router.post('/login', AuthCtrl.login);
router.post('/signup', AuthCtrl.signup);

module.exports = router;
