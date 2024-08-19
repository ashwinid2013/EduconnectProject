import { useState, useEffect } from "react";

function ViewTeachersComponent() {
  const Parentprofile = JSON.parse(localStorage.getItem("loggedUser"));
  const parentid = Parentprofile.username.uid;

  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [classDetails, setClassData] = useState(null);
  const [classTeachers, setClassTeachers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch students from the API
  useEffect(() => {
    if (parentid) {
      fetch(`http://localhost:8080/getStudentsByParents/${parentid}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setStudents(data);
          } else {
            console.error("Unexpected data format:", data);
            setStudents([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
          setStudents([]);
        });
    }
  }, [parentid]);

  // Fetch selected student details and class data
  useEffect(() => {
    if (selectedStudentId) {
      fetch(`http://localhost:8080/getStudentById/${selectedStudentId}`)
        .then((response) => response.json())
        .then((data) => {
          setStudentDetails(data);
          return fetch(`http://localhost:8080/getClassStudent/${selectedStudentId}`);
        })
        .then((response) => response.json())
        .then((data) => {
          setClassData(data);
        })
        .catch((error) => {
          console.error("Error fetching additional data:", error);
          setClassData(null);
        });
    }
  }, [selectedStudentId]);

  // Fetch teachers based on student ID and class ID
  const handleViewTeachers = () => {
    if (!selectedStudentId) {
      setError("Please select a student first.");
      return;
    }

    if (!classDetails || !classDetails.std_id) {
      setError("Class details are not available for the selected student.");
      return;
    }

    setError(null);
    const std = classDetails.std_id;
    fetch(`http://localhost:8080/getClassTeachersByStandard/${std}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setClassTeachers(data);
        } else {
          setClassTeachers([]);
          setError("No teachers found for the selected class.");
        }
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        setClassTeachers([]);
        setError("Error fetching teachers. Please try again later.");
      });
  };

  // Handle select change
  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedStudentId(selectedId);
    setClassTeachers([]); // Clear previous teachers list
    setError(null); // Clear previous errors
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center"> 
        <div className="col-md-12">
          <div className="card shadow-lg">
          <h4>View Teachers</h4>
            <div className="card-body">
              <h6>Select Your Child</h6>
              <div className="mb-4">
                <select
                  className="form-select form-select-lg"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "16px",
                    color: "#333",
                    backgroundColor: "#f5f5f5",
                  }}
                  onChange={handleSelectChange}
                  value={selectedStudentId || ""}
                >
                  <option value="">Select Student</option>
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

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="text-center">
                <input
                  type="button"
                  value="View Teachers"
                  className="btn btn-primary btn-lg"
                  onClick={handleViewTeachers}
                />
              </div>

              {classTeachers.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                  <div>
                    <h6 className="text-center">Teachers Details</h6>
                    <table className="table-bordered center" style={{ margin: "0 auto" }}>
                      <thead>
                        <tr>
                        <th style={{ padding: "10px" }}>Subject Name</th>
                          <th style={{ padding: "10px" }}>Teacher Name</th>
                          <th style={{ padding: "10px" }}>Email</th>
                          
                          {/* <th>Contact No</th> */}
                         
                        </tr>
                      </thead>
                      <tbody>
                        {classTeachers.map((item, index) => (
                          <tr key={index}>
                            <td style={{ padding: "10px" }}>{item.sub_id.sub_name}</td>
                            <td style={{ padding: "10px" }}>{item.tid.fname}{item.tid.lname} </td>
                            {/* <td>{item.tid.contact_no}</td> */}
                            <td style={{ padding: "10px" }}>{item.tid.email}  </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTeachersComponent;
