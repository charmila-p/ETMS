const express = require('express');
const { addTask, getAllTasks, updateStatus } = require('../controller/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post("/add/:pid",addTask)
router.get("/getall",getAllTasks)
router.put("/updated/:id",auth,updateStatus );
module.exports = router; 