const express = require('express');
const router = express.Router();
const Book = require('../controllers/books')


/* GET home page. */
router.get('/', Book.findBooks)
router.post('/', Book.createBooks)
router.delete('/:id', Book.deleteBooks)
router.put('/:id', Book.updateBooks)

module.exports = router;
