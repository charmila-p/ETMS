const express = require('express');
const { getUserInfo, login } = require('../controller/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get("/user",auth,getUserInfo)
router.post("/login",login)

module.exports = router; 
