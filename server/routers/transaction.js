let express = require('express')
let router = express.Router()
let transaction = require('../controllers/transaction.js')

// router.post('/login',user.addLogin)
router.post('/',transaction.addTransaction)
router.get('/',transaction.getTransaction)
router.delete('/:id',transaction.deleteTransaction)

module.exports = router
