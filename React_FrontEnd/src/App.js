import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/login';
import ParentComponent from './components/Parent';
import AdminComponent from './components/Admin';
import TeacherComponent from './components/Teacher';
import { useSelector } from 'react-redux';
import LogoutComp from './components/LogoutComp';
import AddUser2 from './components/Adduser2';
import ContactUs from './components/ContactUS';
import AddSubject from './components/AddSubject';
import UpdateUser from './components/UpdateUser';
import AssignParent from './components/AssignParent';
import AssignStudent from './components/AssignStudent';
import ViewChildComponent from './components/ViewChild';
import AssignTeacher from './components/AssignTeacher';
import ViewTeachersComponent from './components/ViewTeachers';
import UploadHomework from './components/UploadHomeWork';
import ViewHomeworkComponent from './components/ViewHomework';
import AddMarks from './components/AddMarks';
import ViewMarksParentComponent from './components/ViewMarksParent';
import ViewAssignedClasses from './components/ViewAssignClasses';
import ViewMarksTeacher from './components/ViewMarksTeacher';

function App() {
  const mystate = useSelector((state) => state.logged);

  const backgroundImageStyle = {
    backgroundImage: `url("https://img.pikbest.com/backgrounds/20220119/parents-meeting-2c-blue-cartoon-background-of-teaching-building_6245809.jpg!sw800")`, // Update with the correct path
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '90vh',
  };

  return (
    <div className="App" >
      <header className="app-header bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gwaIP7z8rY_XxsMkCd991jeKdmDJmPJ2cq2MvAa40jGQH-CZDBUwfKvffPVJYIXlO0o&usqp=CAU" width={100} height={100} alt='logo' />
        {!mystate.loggedIn && (
          <nav className='d-flex' >
            <ul className='navbar-nav flex-row' >

              <li className='nav-item'>
                <NavLink to="/" className="nav-link px-3" activeclassname="active">Home</NavLink>
              </li>

              <li className='nav-item'>
                <NavLink to="/contact" className="nav-link px-3" activeclassname="active">Contact Us</NavLink>
              </li>

              <li className='nav-item'>
                <NavLink to="/login" className="nav-link px-3" activeclassname="active">Login</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>
          <div   style={backgroundImageStyle}>

      <Routes>
        <Route path="/" element={<HomeComponent />} />
      
        <Route path="/login" element={<LoginComponent />} />

        <Route path="/Admin_home" element={<AdminComponent />}>
          <Route path="AddUser" element={<AddUser2 />} />
          <Route path="AddSubject" element={<AddSubject />} />
          <Route path="UpdateUser" element={<UpdateUser />} />
          <Route path="AssignParent" element={<AssignParent />} />
          <Route path="AssignStudent" element={<AssignStudent />} />
          <Route path="AssignTeacher" element={<AssignTeacher />} />
        </Route>

        <Route path="/Teacher_home" element={<TeacherComponent />} >
          <Route path="AddHomework" element={<UploadHomework />} />
          <Route path="addMarks" element={<AddMarks />} />
          <Route path="ViewAssignedClasses" element={<ViewAssignedClasses />} />
          <Route path="ViewMarksByTeacher" element={<ViewMarksTeacher />} />
        </Route>

        <Route path="/Parent_home" element={<ParentComponent />} >
          <Route path="viewChild" element={<ViewChildComponent />} />
          <Route path="viewTeachers" element={<ViewTeachersComponent />} />
          <Route path="viewHomework" element={<ViewHomeworkComponent />} />
          <Route path="viewChildMarks" element={<ViewMarksParentComponent />} />


        </Route>

        <Route path="/logout" element={<LogoutComp />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      </div>
    </div>
  );
}



function HomeComponent() {

  return ( <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
    }}
  >
    <h1 className="text-blue text-center">Welcome to EduConnect</h1>
  </div>);
  
}

export default App;
