const express = require('express');
const { assignTaskToEmployee } = require('../controller/assignController');

const router = express.Router();

router.post("/employee/task", assignTaskToEmployee)

module.exports = router; 