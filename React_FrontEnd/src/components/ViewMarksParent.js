import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewChildComponent() {
  const Parentprofile = JSON.parse(localStorage.getItem("loggedUser"));
  const parentid = Parentprofile.username.uid;
  console.log(parentid);

  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(); //studid
  const [studentDetails, setStudentDetails] = useState(null);
  const [classDetails, setclassData] = useState([]); // State to hold the response from the additional API call
  const std = classDetails.std_id; ////stdid
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [examTypes, setExamTypes] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState('');
  const [marksData, setMarksData] = useState([]);
  const [validationError, setValidationError] = useState(''); // State for validation error messages
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track if form is submitted

  console.log("StdID", std);
  console.log(studentDetails);

  useEffect(() => {
    fetch('http://localhost:8080/getExamTypes')
      .then(response => response.json())
      .then(data => setExamTypes(data))
      .catch(error => console.error('Error fetching exam types:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/getYears')
      .then(response => response.json())
      .then(data => setYears(data))
      .catch(error => console.error('Error fetching years:', error));
  }, []);

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

  useEffect(() => {
    if (selectedStudentId) {
      fetch(`http://localhost:8080/getStudentById/${selectedStudentId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Student details response:', data);
          setStudentDetails(data);

          return fetch(`http://localhost:8080/getClassStudent/${selectedStudentId}`);
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Standard:', data);
          setclassData(data);
        })
        .catch((error) => {
          console.error('Error fetching additional data:', error);
          setclassData(null);
        });
    }
  }, [selectedStudentId]);

  const handleSelectChange = (e) => {
    setSelectedStudentId(e.target.value);
    setValidationError(''); // Clear validation error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true); // Set form submitted to true

    // Validation checks
    if (!selectedStudentId || !selectedYear || !selectedExamType) {
      setValidationError('Please select a student, year, and exam type.');
      return;
    }

    const url = `http://localhost:8080/viewMarksByStudent/${selectedYear}/${selectedStudentId}/${selectedExamType}/${classDetails.std_id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        setMarksData(data);
        setValidationError(''); // Clear validation error on successful fetch
      })
      .catch(error => {
        console.error('Error fetching marks data:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
          <h4>View Marks</h4>
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
                  value={selectedStudentId}
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

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Select Year:</label>
                  <select
                    className="form-control"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year.yid} value={year.yid}>{year.year_name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="examTypeSelect">Select Exam Type:</label>
                  <select
                    id="examTypeSelect"
                    className="form-select form-control"
                    value={selectedExamType}
                    onChange={(e) => setSelectedExamType(e.target.value)}
                  >
                    <option value="">Select Exam Type</option>
                    {examTypes.map((exam) => (
                      <option key={exam.typeid} value={exam.typeid}>
                        {exam.typename}
                      </option>
                    ))}
                  </select>
                </div>

                {validationError && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {validationError}
                  </div>
                )}

                <div style={{ paddingTop: 20 }}></div>
                <button type="submit" className="btn btn-primary">View Marks</button>
              </form>

              {formSubmitted && marksData.length === 0 && (
                <p className="mt-3">No Marks available</p>
              )}

              {marksData.length > 0 && (
                <div className="mt-4">
                  <h6>Marks Details</h6>
                  <table className="table table-bordered mt-3">
                    <thead>
                      <tr>
                        <th>Exam Name</th>
                        <th>Subject</th>
                        <th>Marks Obtained</th>
                        <th>Total Marks</th>
                        <th>Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marksData.map((mark) => (
                        <tr key={mark.mark_id}>
                          <td>{mark.type_id.typename}</td>
                          <td>{mark.sub_id.sub_name}</td>
                          <td>{mark.obtainedmarks}</td>
                          <td>{mark.type_id.marks}</td>
                          <td>{mark.comment}</td>
                        </tr>
                      ))}
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
