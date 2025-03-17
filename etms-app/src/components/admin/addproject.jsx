import { useState } from "react"
import AdminNavbar from "./navbar"
import axios from "axios";


function AddProject(){

    const [title,setTitle] = useState(undefined);
    const [shortDes,setShortDes] = useState(undefined);
    const [startDate,setStartDate] = useState(undefined);
    const [estimatedDate,setEstimatedDate] = useState(undefined);
 
    const[client,setClient]=useState(undefined);
    const[techstack,setTechStack]=useState(undefined);
    const [msg,setMsg] = useState(undefined)
    
    const ProcessForm = async ($event)=>{
        try{
            $event.preventDefault();
            let header={
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        
           let OnboardAPI='http://localhost:5000/api/project/add'
            const response = await axios.post(OnboardAPI, {
                'title':title,
                'shortDes':shortDes,
                'startDate':startDate,
                'estimatedDate':estimatedDate,
                'client':client,
                'techstack':techstack

            }, 
            {headers: header});
            setMsg('Project Added Successfully!!!!')
        }
    
        catch (error) {
            setMsg('Error in Adding Project')
            console.error(error)
        }

    }

    return(
        <>
            <div className="row">  
                <div className="col-lg-12"> <AdminNavbar /></div>
            </div>
            <div className="row mt-4">  
                <div className="col-sm-2"> </div>
                <div className="col-md-8"> 
                    <div className="card">
                        <div className="card-header">
                            Add Project 
                        </div>
                        <div className="card-body">

                            <form class="row g-3" onSubmit={ProcessForm}>
                                {msg ? <div class="col-md-12">
                                    <div className="alert alert-primary">
                                        {msg}
                                    </div>    
                                </div> : ""}

                                <div class="col-lg-12">
                                    <label class="form-label">TITLE</label>
                                    <input type="text" class="form-control"
                                        onChange={($event) => setTitle($event.target.value)} />
                                </div>
                                <div class="col-lg-12">
                                    <label  class="form-label">SHORT DESCRIPTION</label>
                                    <input type="text" class="form-control" 
                                        onChange={($event)=>setShortDes($event.target.value)} />
                                </div>
                                <div class="col-md-6">
                                    <label  class="form-label">START DATE</label>
                                    <input type="text" class="form-control" placeholder="YYYY-MM-DD" 
                                        onChange={($event)=>setStartDate($event.target.value)} />
                                </div>
                                <div class="col-md-6">
                                    <label  class="form-label">ESTIMATED DATE</label>
                                    <input type="text" class="form-control" placeholder="YYYY-MM-DD"
                                        onChange={($event)=>setEstimatedDate($event.target.value)} />
                                </div>
                                
                                <div class="col-md-6">
                                    <label class="form-label">CLIENT NAME</label>
                                    <input type="text" class="form-control"
                                        onChange={($event) => setClient($event.target.value)} />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">TECH STACK</label>
                                    <input type="text" class="form-control"
                                        onChange={($event) => setTechStack($event.target.value)} />
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary">Add Project</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2"> </div>
            </div>
        </>
    )
}


export default AddProject;