let express = require('express')
let router = express.Router()
let user = require('../controllers/user.js')
let helper = require('../helpers/helper.js')

// router.post('/login',user.addLogin)
router.post('/',user.addUser)
router.get('/',user.getUser)
router.post('/login',user.loginUser)
router.get('/one',user.findUser)

module.exports = router
