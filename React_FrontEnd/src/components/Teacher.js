import { NavLink, Outlet } from "react-router-dom";


function TeacherComponent() {
  const profile = JSON.parse(localStorage.getItem("loggedUser"));

  return (<div>

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

    <div className="App">
      <nav className='navbar navbar-expand-sm bg-light mb-3'>
        <div className='container-fluid'>
          <ul className='navbar-nav'>

            <li className='nav-item'>
              <NavLink to="ViewAssignedClasses" className='"nav-link px-3'>View Assigned Classes</NavLink>
            </li>

            <li className='nav-item'>
              <NavLink to="addMarks" className='"nav-link px-3'>Add Marks</NavLink>
            </li>


            <li className='nav-item'>
              <NavLink to="AddHomework" className='"nav-link px-3'>Add Homework</NavLink>
            </li>


            <li className='nav-item'>
              <NavLink to="ViewMarksByTeacher" className='"nav-link px-3'>View Marks</NavLink>
            </li>


            <li className='nav-item'>
              <NavLink to="/logout" className='"nav-link px-3'>Logout</NavLink>
            </li>


          </ul>
        </div>
      </nav>
      <Outlet />
    </div>


  </div>)
}
export default TeacherComponent;