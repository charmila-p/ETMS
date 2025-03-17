import { useEffect, useState } from "react";
import AdminNavbar from "./navbar";
import axios from "axios";

function AddTask(){
    const [title,settitle]=useState(undefined)
        const [startDate,setstartdate]=useState(undefined)
        const [shortDescription,setshortdec]=useState(undefined)
        const [estimatedend,setetimatedend]=useState(undefined)
        const [msg,setmsg]=useState(undefined)
        const [pid,setpid]=useState(undefined)
        const [project,setproject]=useState([])
    useEffect(()=>{
        const project=async()=>{
        try{
            let pojectapi='http://localhost:5000/api/project/getall?page=1&size=2'
            let responce=await axios.get(pojectapi)
            setproject(responce.data.data)
            console.log(responce.data.data)
        }
        catch(error){
            setmsg('error in adding task')
            console.log(error);
        }
    }
    project()


    },[])

    const Tasks=async($event)=>{
        try {
            $event.preventDefault();
            let taskapi = 'http://localhost:5000/api/task/add/' +pid
            let responce = await axios.post(taskapi, {
                'title': title,
                'startDate': startDate,
                'shortDescription': shortDescription,
                'estimatedEndDate': estimatedend

            })
            setmsg('Task Added....')
        } catch (error) {
            setmsg('Task adding failed')
        }

    }
    return(
        <div>
            <div className="row">
                <div className="col-sm-4-mt-4">
                    <AdminNavbar/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4-mt-4">
                    <div className="card">
                        <div className="card-header">
                            <strong>Add Tasks</strong>
                        </div>
                        <div className="card-body">
                        <form className="row g-3" onSubmit={Tasks}>
                                {msg?<div className="col-mb-6">
                                    <div className="alert alert-primary">
                                    {msg}
                                    </div>
                                </div>:""}
                                <div className="col-md-12">
                                    <label className="form-label">title*</label>
                                    <input type="text" className="form-control"
                                        onChange={($event) => settitle($event.target.value)} />
                                </div>
                                
                                <div className="col-12">
                                    <label className="form-label">shortDescription*</label>
                                    <input type="text" className="form-control"
                                        onChange={($event) => setshortdec($event.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label" >startDate</label>
                                    <input type="text" className="form-control" placeholder='YYYY-MM-DD'
                                        onChange={($event) => setstartdate($event.target.value)} />
                                </div>
                                
                                <div className="col-md-6">
                                    <label className="form-label" >estimatedEndDate</label>
                                    <input type="text" className="form-control" placeholder='YYYY-MM-DD'
                                        onChange={($event) => setetimatedend($event.target.value)} />
                                </div>
                                <div className="mt-4">
                                    <label>Select Project: </label>
                                    <select className="form-control" 
                                        onChange={(e)=> setpid(e.target.value)}>                                  
                                        <option>--------Select Project------</option>
                                        {
                                            project.map((p,index)=>(
                                                <option key={index} value={p._id}>
                                                    {p.title}
                                                </option>
                                            ))
                                            }
                                       
                                    </select>
                                </div>


                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary">Add Task</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )

}
export default AddTask;