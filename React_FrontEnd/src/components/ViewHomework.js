import { useState, useEffect } from "react";

function ViewhomeworkComponent() {
  const Parentprofile = JSON.parse(localStorage.getItem("loggedUser"));
  const parentid = Parentprofile.username.uid;

  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [classDetails, setClassData] = useState(null);
  const [homework, setHomeworks] = useState([]);
  const [error, setError] = useState(null);

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

  const handleViewHomeworks = () => {
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
    fetch(`http://localhost:8080/ViewHomeworksByStandard/${std}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHomeworks(data);
        } else {
          setHomeworks([]);
          setError("No homework found for the selected class.");
        }
      })
      .catch((error) => {
        console.error("Error fetching homework:", error);
        setHomeworks([]);
        setError("Error fetching homework. Please try again later.");
      });
  };

  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedStudentId(selectedId);
    setHomeworks([]); // Clear previous homework list
    setError(null); // Clear previous errors
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-12">
          <div className="card shadow-lg">
          <h4>View Homework</h4>
            <div className="card-body">
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
                  value="View Homework"
                  className="btn btn-primary btn-lg"
                  onClick={handleViewHomeworks}
                />
              </div>

              {homework.length > 0 && (
                <div className="mt-4">
                  <h6>Homework Details</h6>
                  <table className="table-bordered center" style={{ margin: "0 auto" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "10px" }}>Subject Name</th>
                        <th style={{ padding: "10px" }}>Homework Description</th>
                        <th style={{ padding: "10px" }}>Teacher Name</th>
                        <th style={{ padding: "10px" }}>Assign Date</th>
                        <th style={{ padding: "10px" }}>Submission Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {homework.map((item, index) => (
                        <tr key={index}>
                          <td style={{ padding: "10px" }}>{item.sub_id.sub_name}</td>
                          <td style={{ padding: "10px" }}>{item.description}</td>
                          <td style={{ padding: "10px" }}>{item.tid.fname} {item.tid.lname}</td>
                          <td style={{ padding: "10px" }}>{formatDate(item.assign_date)}</td>
                          <td style={{ padding: "10px" }}>{formatDate(item.submission_date)}</td>
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

export default ViewhomeworkComponent;
