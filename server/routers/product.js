let express = require('express')
let router = express.Router()
let user = require('../controllers/product.js')

// router.post('/login',user.addLogin)
router.post('/',user.addProduct)
router.get('/',user.getProduct)

module.exports = router
