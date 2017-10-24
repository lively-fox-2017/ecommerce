var express = require('express');
var cors = require('cors')
var methodOverride = require('method-override');
var router = express.Router();
var productCtrl = require('../controllers/product')
/* GET home page. */

router.use(cors())


router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

router.get('/',productCtrl.get);

router.post('/', productCtrl.post)

router.get('/edit/:id', productCtrl.getEditPage)

router.put('/:id', productCtrl.update)

router.delete('/:id', productCtrl.delete)

module.exports = router;
