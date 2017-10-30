const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/ItemController');

router.get('/', ItemController.fetchAll);
router.get('/:id', ItemController.fetchById);
router.post('/', ItemController.create);
router.put('/:id', ItemController.update);
router.delete('/:id', ItemController.delete);

module.exports = router;
