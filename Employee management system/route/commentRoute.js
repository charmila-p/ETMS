const express = require('express');
 const auth = require('../middleware/auth');
const { addComments, getComments, getCommentById } = require('../controller/commentController');

 
 const router = express.Router();
 
router.post('/add',auth,addComments)
router.get('/getall',auth,getComments)
router.get('/get/:id',auth,getCommentById)
  
 module.exports = router; 