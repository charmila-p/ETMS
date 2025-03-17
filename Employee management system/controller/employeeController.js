const Admin = require("../model/admin");
const Employee = require("../model/employee");
const multer  = require('multer')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.addEmployee=async(req,res)=>{
    
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ err: errors.array() });
        let obj = req.user; 
        let userN = obj.username;

        //check if this is admin's userN 
        let admin = await Admin.findOne({'username': userN});
        if(!admin)
            return res.status(401).json({ 'msg': 'UnAuthorized' })
        let {name,jobTitle,city,salary,profilePic,cv,username,password}=req.body;

        let salt=10;
        const hashedPassword=await bcrypt.hash(password,salt);
        let employee=new Employee({name,jobTitle,city,salary,profilePic,cv,username,'password':hashedPassword})
        employee=await employee.save();
        return res.status(200).json(employee);
    }
    catch(err){
        return res.status(400).json(err)
    }
}
exports.getAllEmployee=async(req,res)=>{
    let obj = req.user; 
    let username = obj.username; 

    let admin = await Admin.findOne({'username': username})
    if(!admin)
        return res.status(401).json({'msg': 'Unauthorized'})



    const employees=await Employee.find();
    return res.json(employees)
}
exports.login = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ err: errors.array() });
    let {username,password} = req.body; 

    let employee = await Employee.findOne({'username': username})
    if(!employee) 
        return res.status(400).json({'msg': 'Invalid Credentials!!'})

    let isValid = await bcrypt.compare(password, employee.password); 
    if(!isValid)
        return res.status(400).json({'msg':'Invalid Credentials!!!!'})

    const SECRET_KEY = '27052003';
    let employeeObj = {
        'username': employee.username,
    }
    const token = jwt.sign(employeeObj, SECRET_KEY, { 'expiresIn': '1h' });
    res.json({ 'token': token })
}
exports.uploadCV =  async (req,res)=>{
    try{
        let obj = req.user; 
    let username = obj.username; 

    let employee = await Employee.findOne({'username': username})
     
    if(employee === undefined || employee == null) 
        return res.status(400).json({'msg': 'Invalid Credentials!!'})

    if(!req.file){
        return res.status(400).json({'msg': 'No File detected!!'})
    }

    const multerFileName = req.file.filename; 
    const mimeType = req.file.mimetype;
    const originalFileName = req.file.originalname;
    const fileExtension = mimeType.split('/').pop()

    const allowedExtensions = ['docx', 'pdf']; 
    if(!allowedExtensions.includes(fileExtension)){
        return res.status(400).json({'msg': 'File Not allowed!! Allowed Types ' + allowedExtensions})
    }
    employee.cv = multerFileName + '.' + fileExtension

    employee = await employee.save(employee);
    res.json( employee);
    }
    catch(err){
        return res.status(400).json(err)
    }
}
exports.uploadProfile =  async (req,res)=>{
    try{
    let obj = req.user; 
    let username = obj.username; 

    let employee = await Employee.findOne({'username': username})
     
    if(employee === undefined || employee == null) 
        return res.status(400).json({'msg': 'Invalid Credentials!!'})

    if(!req.file){
        return res.status(400).json({'msg': 'No File detected!!'})
    }

    const multerFileName = req.file.filename; 
    const mimeType = req.file.mimetype;
    const originalFileName = req.file.originalname;
    const fileExtension = mimeType.split('/').pop()
    const allowedExtensions = ['jpg','jpeg','pdf','img','png','gif','svg']; 
    if(!allowedExtensions.includes(fileExtension)){
        return res.status(400).json({'msg': 'File Not allowed!! Allowed Types ' + allowedExtensions})
    }
    employee.profilePic = multerFileName + '.' + fileExtension

    employee = await employee.save(employee);
    res.json( employee);
    }
    catch(err){
        return res.status(400).json(err)
    }
}
exports.getProfile = async (req, res) => {
    try {
        const username = req.user.username;
        const employee = await Employee.findOne({ username });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } 
    catch (err) {
        res.status(400).json(err);
    }
};