const express = require('express');
const { addEmployee, getAllEmployee, login, uploadCV, uploadProfile, getProfile } = require('../controller/employeeController');
const auth = require('../middleware/auth');
const multer=require('multer');
const {body}=require('express-validator')
const upload=multer({dest:'C:/Users/Dell/Documents/TRAINING/etms-app/public/docs/cv'})
const profilePic=multer({dest:'C:/Users/Dell/Documents/TRAINING/etms-app/public/docs/profilepic'})


const router = express.Router();
router.post("/add",[
        body('username').not().isEmpty(),
        body('password').isLength({ min: 6, max: 14 })
],auth,addEmployee)
router.get("/profile", auth, getProfile)
router.get("/getall",auth,getAllEmployee)
router.post("/login",[
        body('username').not().isEmpty(),
        body('password').not().isEmpty(),
],login)
router.post("/uploadcv",upload.single('file'),auth,uploadCV)
router.post("/uploadprofile",profilePic.single('file'),auth,uploadProfile)

module.exports = router;