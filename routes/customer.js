var express = require('express');
var methodOverride = require('method-override');
var cors = require('cors')
var router = express.Router();
var customerCtrl = require('../controllers/customer')
/* GET home page. */

router.use(cors())


router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

router.get('/', customerCtrl.get);

router.get('/add', customerCtrl.getAddPage)

router.post('/', customerCtrl.post)

router.post('/login', customerCtrl.login)

router.get('/edit/:id', customerCtrl.getEditPage)

router.put('/', customerCtrl.update)

router.delete('/:id', customerCtrl.delete)

module.exports = router;
