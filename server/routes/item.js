const express = require('express');
const router = express.Router();
const item = require('../controller/item');

router.get('/',item.list);
router.post('/',item.add);
router.put('/:id',item.edit);
router.delete('/:id',item.delete);
// router.get('/:id',item.findById);
// router.delete('/:token',(req,res)=>{
//   console.log('heehhshshs');
// });

module.exports = router;
