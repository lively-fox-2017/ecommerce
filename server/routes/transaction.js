const express = require('express');
const router = express.Router();
const transaction = require('../controller/transaction');

router.get('/',transaction.list);
router.post('/',transaction.add);
router.put('/:id',transaction.edit);
router.delete('/:id',transaction.delete);
// router.delete('/:token',(req,res)=>{
//   console.log('heehhshshs');
// });

module.exports = router;
