const Employee = require("../model/employee");
const Project = require("../model/project");
const Task = require("../model/task");

exports.addTask=async (req,res)=>{
    const pid = req.params.pid; 
    let {title, shortDescription, estimatedEndDate} = req.body; 

    //validate this pid 
    let project = await Project.findById(pid); 
    if(!project)
        return res.status(400).json({'msg' : 'Invalid project Id given..'})

    let task = new Task({title, shortDescription, estimatedEndDate, 
        'project':project._id });
    task = await task.save();
    return res.json(task);
}

exports.getAllTasks =async (req,res)=>{
    let tasks = await Task.find().populate('project');
    res.json(tasks)
}
exports.updateStatus = async(req, res) => {
    try
    {  
       let obj=req.user;
       let userN=obj.username;
       let employee=await Employee.findOne({'username':userN})
       if(!employee)
       {
        return res.status(400).json({'msg':'Unauthorized'})
       }
       const id = req.params.id;
        let newObj={$set:(req.body)}
        const task = await Task.findByIdAndUpdate(id,newObj);
        if(!task){

            res.status(400).json({'msg':`Invalid ID: ${id}`})
        }
        return res.status(200).json(task)        
    }
    catch(err)
    {
        res.status(400).json({'msg':`Error in api ${err}`});
    }
}