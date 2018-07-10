const express = require('express');
const router = express.Router();
const categories = require('../controllers/categoriesCtrl');

router.post('/add', categories.addCategories)
router.get('/', categories.findAll)

module.exports = router;
