import { NavLink } from "react-router";

function AdminNavbar() {
    return (
        <div>
            <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
                <div class="container-fluid">
                    
                    <a class="navbar-brand" href="#">ETMS</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                        <li class="nav-item">
                                <NavLink to='/admin/dashboard' style={{ 'textDecoration': 'none' }}>
                                    <a class="nav-link" href="#">Home</a></NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to='/admin/employee-onboarding' style={{ 'textDecoration': 'none' }}>
                                    <a class="nav-link" href="#">Employee Onboarding</a></NavLink>
                            </li>
                            <li class="nav-item">
                               
                                <NavLink to='/admin/employees' style={{ 'textDecoration': 'none' }}>
                                    <a class="nav-link" href="#">All Employees</a></NavLink>
                            </li>
                            <li class="nav-item">
                                
                                <NavLink to='/admin/add-project' style={{ 'textDecoration': 'none' }}>
                                    <a class="nav-link" href="#">Add Project</a></NavLink>
                            </li>
                            <li class="nav-item">
                               
                                <NavLink to='/admin/add-task' style={{ 'textDecoration': 'none' }}>
                                    <a class="nav-link" href="#">Add task</a></NavLink>
                            </li>
                            <li class="nav-item">
                               
                                <NavLink to='/admin/assign-task' style={{ 'textDecoration': 'none' }}>
                                    <a class="nav-link" href="#">Assign Task to Employee</a></NavLink>
                            </li>
                             

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default AdminNavbar;