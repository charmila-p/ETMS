import EmployeeNavbar from "./navbar"
import EmpProfile from "./profile"

function EmployeeDashboard() {
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <EmployeeNavbar />
            </div>
        </div>
        <div className="row">
                
        </div>
        <div className="col-lg-12">
                 <EmpProfile />
             </div>
       
    </div>
        
        )
}

export default EmployeeDashboard