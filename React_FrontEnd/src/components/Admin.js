import { NavLink, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminComponent() {
  const profile = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Welcome {profile.username.fname} {profile.username.lname}</h1>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>User Id:</strong> {profile.username.uid}<br /><strong>Email:</strong> {profile.username.email}</td>
                    <td><strong>Username:</strong> {profile.username.username}<br /><strong>Contact No:</strong> {profile.username.contactNo}</td>
                  </tr>
                </tbody>
              </table>
            
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            <div className='container-fluid'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink to="AddUser" className="nav-link px-3" end>Add User</NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink to="AssignParent" className="nav-link px-3" end>Assign Parent</NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink to="AddSubject" className="nav-link px-3" end>Add Subject</NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink to="AssignStudent" className="nav-link px-3" end>Assign Student</NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink to="AssignTeacher" className="nav-link px-3" end>Assign Teacher</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to="UpdateUser" className="nav-link px-3" end>Update User</NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to="/logout" className="nav-link px-3" end>Logout</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminComponent;
