const express = require('express')
const router = express.Router()
const user = require('../controller/userController')

router.get('/', user.findAll);

router.post('/login', user.login)

router.get('/:id', user.findOne);

router.post('/insert', user.insert);

router.put('/update/:id', user.update);

router.delete('/delete/:id', user.delete);

module.exports = router
