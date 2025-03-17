import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmpProfile = () => {

    const [name, setName] = useState(undefined);
    const [city, setCity] = useState(undefined);
    const [salary, setSalary] = useState(undefined);
    const [jobTitle, setjobTitle] = useState(undefined);
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    
    //For data fetching
    useEffect(() => {
        const gettingProfile = async () => {
          try {
            const getApi = 'http://localhost:5000/api/employee/profile';
            const header = {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            };
            
            const response = await axios.get(getApi, { headers: header });
            const data = response.data;
    
            console.log("Fetched Data: ", data);

            setName(data.name)
            setCity(data.city)
            setSalary(data.salary)
            setUsername(data.username)
            setPassword(data.password)
            setjobTitle(data.jobTitle)
          } 
          catch (error) 
          {
            console.log(error);
          }
        };
        gettingProfile();
    }, []);

    //For CV uploads

    const [file, setFile] = useState(null)
    
    const handlefile =(e) => {
        setFile(e.target.files[0])
    } 
    
    const uploadCv = async() => {
        if(!file)
            toast("No file is uploaded")

        const fData = new FormData();
        fData.append('file', file)

        const postApi = 'http://localhost:5000/api/employee/uploadcv';
        const header = {
            'Authorization': 'Bearer '+ localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
        }

        try
        {
            const response = await axios.post(postApi, fData, {
                headers: header
            })
            toast("CV uploaded Successfully")
        }
        catch(err)
        {
            console.log(err)
        }
    }


    //For Profil Pic uploads

    const [img, setImg] = useState(null);

    const handleImage = (e) => {
        setImg(e.target.files[0])
    }

    const UploadPic = async() => {
        if(!img)
            toast("No Image Uploaded")

        const fData = new FormData();
        fData.append('file', img);

        const postApi = 'http://localhost:5000/api/employee/uploadprofile';
        const header = {
            'Authorization': 'Bearer '+ localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
        }

        try
        {
            const response = await axios.post(postApi, fData, {
                headers: header
            })
            toast("Profile Pic Uploaded successfully")
        }
        catch(err)
        {
            console.log(err)
        }

    }

    return (
        <div className="card">
            <div className="card-header">
                Employee Profile
            </div>
            <div className="card-body">
                <form class="row g-3" >
                    <div class="col-md-6">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" value={name}
                        onChange={($event)=> setName($event.target.value)}
                        />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">City</label>
                        <input type="text" class="form-control" value={city}
                        onChange={($event)=> setCity($event.target.value)}
                        />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Salary</label>
                        <input type="text" class="form-control" value={salary}
                        onChange={($event)=> setSalary($event.target.value)}
                        />
                    </div>
                    <div class="col-6">
                        <label for="inputAddress" class="form-label">Select Job Title</label>
                        <input type="text" class="form-control" value={jobTitle}/>
                    </div>
                    <hr />
                    <div class="col-md-6">
                        <label for="inputZip" class="form-label">Username</label>
                        <input type="text" class="form-control" value={username}
                        onChange={($event)=> setUsername($event.target.value)}
                        />
                    </div>
                    <div class="col-md-6">
                        <label for="inputZip" class="form-label">Password</label>
                        <input type="text" class="form-control" value={password}
                        onChange={($event)=> setPassword($event.target.value)}
                        />
                    </div>
                    <hr />
                    </form>
                    <div class="col-lg-12">
                        <label for="inputCity" class="form-label">Profile Pic</label>
                        <input type="file" class="form-control" id="inputCity" onChange={handleImage}/>
                        <br />
                        <button className="btn btn-secondary" onClick={UploadPic}>Upload</button>
                    </div>
                    <hr />
                    <div class="col-lg-12">
                        <label for="inputCity" class="form-label">Upload updated CV</label>
                        <input type="file" class="form-control" id="inputCity" onChange={handlefile}/>
                        <br />
                        <button onClick={uploadCv}>Upload</button>
                    </div>
                    <hr />
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Save Profile</button>
                    </div>
                
            </div>
        </div>
    )
}

export default EmpProfile