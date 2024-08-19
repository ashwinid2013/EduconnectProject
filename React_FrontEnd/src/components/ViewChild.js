import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewChildComponent() {
  const Parentprofile = JSON.parse(localStorage.getItem("loggedUser"));
  const parentid = Parentprofile.username.uid;
  console.log(parentid);

  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [classDetails, setclassData] = useState([]); // State to hold the response from the additional API call
 const std=classDetails.std_id;
 console.log("StdID",std);
  console.log(studentDetails);

  // Fetch students from the API
  useEffect(() => {
    if (parentid) {
      fetch(`http://localhost:8080/getStudentsByParents/${parentid}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('API response:', data);
          if (Array.isArray(data)) {
            setStudents(data);
          } else {
            console.error('Unexpected data format:', data);
            setStudents([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
          setStudents([]);
        });
    }
  }, [parentid]);

  // Fetch selected student details from the server
  useEffect(() => {
    if (selectedStudentId) {
      fetch(`http://localhost:8080/getStudentById/${selectedStudentId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Student details response:', data);
          setStudentDetails(data);

          // Additional API call with the selected student ID
          return fetch(`http://localhost:8080/getClassStudent/${selectedStudentId}`);
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Standard:', data);
          setclassData(data); // Save the additional response data
        })
        .catch((error) => {
          console.error('Error fetching additional data:', error);
          setclassData(null); // Clear the additional data if there's an error
        });
    }
  }, [selectedStudentId]);

  // Handle select change
  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedStudentId(selectedId);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
          <h4>View Child</h4>
            <div className="card-body p-4">
             
              <h6>Select Your Child</h6>
              <div className="mb-4">
                <select
                  className="form-select form-select-lg"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '16px',
                    color: '#333',
                    backgroundColor: '#f5f5f5',
                  }}
                  onChange={handleSelectChange}
                >
                  <option>Select Student</option>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <option key={student.sid} value={student.sid}>
                        {student.fname} {student.lname}
                      </option>
                    ))
                  ) : (
                    <option disabled>No students available</option>
                  )}
                </select>
              </div>

              {studentDetails && (
                <div className="mt-4">
                  <h6>Student Information</h6>
                  <table className="table table-bordered mt-3">
                    <tbody>
                      <tr>
                        <td>
                          <strong>First Name:</strong> {studentDetails.fname}
                        </td>
                        <td>
                          <strong>Last Name:</strong> {studentDetails.lname}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Student ID:</strong> {studentDetails.sid}
                        </td>
                       <td>
                          <strong>Standard:</strong> {std}
                        </td> 
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewChildComponent;