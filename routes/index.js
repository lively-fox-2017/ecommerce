var express = require('express');
var cors = require('cors')
var router = express.Router();

router.use(cors())

router.get('/', function(req, res, next) {
  res.send('Hi saya data dari server')
});

module.exports = router;
