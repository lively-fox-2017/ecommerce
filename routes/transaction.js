var express = require('express');
var methodOverride = require('method-override');
var cors = require('cors')
var router = express.Router();
var Collection = require('../models/transaction')
var transactionCtrl = require('../controllers/transaction')
/* GET home page. */

router.use(cors())

router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

router.get('/', transactionCtrl.get);

router.post('/', transactionCtrl.post)

router.get('/edit/:id', transactionCtrl.getEditPage)

router.put('/:id', transactionCtrl.update)

router.delete('/:id',transactionCtrl.delete)

module.exports = router;
