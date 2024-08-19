import { Link, Outlet } from "react-router-dom";
function ParentComponent() {
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
                  <td><strong>User ID:</strong> {profile.username.uid}<br /><strong>Email Address:</strong> {profile.username.email}</td>
                  <td><strong>User Name:</strong> {profile.username.username}<br /><strong>Contact No:</strong> {profile.username.contactNo}</td>
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
                <Link to="viewChild" className='"nav-link px-3'>View Child</Link>
              </li>

              <li className='nav-item'>
                <Link to="viewChildMarks" className='"nav-link px-3'>View Marks</Link>
              </li>

              <li className='nav-item'>
                <Link to="viewHomework" className='"nav-link px-3'>View Homework</Link>
              </li>

              <li className='nav-item'>
                <Link to="viewTeachers" className='"nav-link px-3'>View Teachers</Link>
              </li>

              <li className='nav-item'>
                <Link to="/logout" className='"nav-link px-3'>Logout</Link>
              </li>

            </ul>
          </div>
        </nav>
        <Outlet />
      </div>

    </div>)
}
export default ParentComponent;


