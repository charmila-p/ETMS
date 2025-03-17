const express = require('express');
const { addProject, getAllProject } = require('../controller/projectController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post("/add", auth,addProject)
router.get("/getall",getAllProject)

module.exports = router;