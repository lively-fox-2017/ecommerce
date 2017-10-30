const express = require('express');
const router = express.Router();
const signin = require('../controller/signin');

router.post('/',signin.signin);
router.post('/FB',signin.signinFB);

module.exports = router;
