import { useEffect, useState } from "react";
import EmployeeNavbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeTask() {
    const [tasks, setTasks] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        const getTasks = async () => {
            try {
                const resp = await axios.get("http://localhost:5000/api/task/getall");
                setTasks(resp.data);
            } catch (error) {
                console.log(error);
            }
        };
        getTasks();
    }, []);
    const gotoRoute = (task) => {
        navigate('/employee/tasks/details', { state: { task } })
    }
    const moveToArchive = async(task) => {
        const id = task._id;
        console.log(id)
        const putApi = `http://localhost:5000/api/task/updated/${id}`;
        const header = {
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        }
        await axios.put(putApi, {'status': "archive" }, {headers: header})
        toast("Archived successfully")
    }


    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <EmployeeNavbar/>
                </div>
            </div>
            <div className="row">
                {tasks.map((e, index) => (
                    <div className="col-md-6 mt-4" key={index}>
                        <div className="card">
                            <div className="card-header">
                                Start Date: {e.startDate}
                            </div>
                            <div className="card-body">
                                Title: {e.title}
                                <br />
                                Project Name: {e.project.title}
                                <br />
                                {e.description}
                                <br /><br />
                                <button className="btn btn-info" onClick={()=>gotoRoute(e)}>View Full Details</button>
                            </div>
                            <div className="card-footer">
                                Estimated End Date: {e.estimatedEndDate}
                            </div>
                            <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => moveToArchive(e)}>
                            Archive
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default EmployeeTask;