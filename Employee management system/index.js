const express = require('express');
const dbConnect = require('./config/dbconfig');
const app = express(); //creates an instance of an Express application
const employeeRoute=require('./route/employeeRoute')
const projectRoute=require('./route/projectRoute')
const taskRoute=require('./route/taskRoute')
const assignRoute=require('./route/assignRoute')
const adminRoute=require('./route/adminRoute')
const authRoute=require('./route/authRoute')
const commentRoute = require('./route/commentRoute');
var cors = require('cors')

const {json}=require('body-parser')

const $PORT = process.env.$PORT || 5000; //we will get port either from could we can manually given 
app.use(express.json())//convert into json for readable format
app.use(cors())//cross origin.(acess trusted domains)
dbConnect();//db is established ...

app.use('/api/employee',employeeRoute),//use the specific route
app.use('/api/project',projectRoute)
app.use('/api/task', taskRoute)
app.use('/api/assign',assignRoute)
app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)
app.use('/api/comment', commentRoute)
app.listen($PORT, function () {
    console.log(`Server listening on port ${$PORT}`)
})
//express server: handling HTTP requests, routing, and middleware.
