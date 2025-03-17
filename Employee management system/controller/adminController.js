const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

exports.addAdmin= async (req,res)=>{
    const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ err: errors.array() });
    let {username,password} = req.body; 

    /** 
     * this password is clear text password. I want to generate
     * its hash code to save it in DB
     * 
     */
    let salt = 10; 
    const hashedPassword = await bcrypt.hash(password,salt);

    let admin = new Admin({username, 'password': hashedPassword});
    admin = await admin.save();
    res.json(admin)
}

exports.login =async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ err: errors.array() });
    let {username,password} = req.body; 

    /** I will fetch Admin details from Db using given username */
    let admin = await Admin.findOne({'username': username}); 

    if(!admin)
        return res.status(400).json({'msg': 'Invalid Credentials!!'})

     /** check the password 
     * this password given in api is a plain text password: admin@123
     * the password saved in the DB is a hashed version of this password 
     * use bcrypt to compare plain text and hashed password   
    */
    let isValid = await bcrypt.compare(password, admin.password);
    if(!isValid)
        return res.status(400).json({'msg':'Invalid Credentials!!!!'})

    /** since i have verified username and password, 
     * its time to generate the token */
    const SECRET_KEY = '27052003';
    let adminObj = {
        'username' : admin.username,
       }
    const token = jwt.sign(adminObj, SECRET_KEY , {'expiresIn' :'20h'});
       res.json({'token' : token})
}