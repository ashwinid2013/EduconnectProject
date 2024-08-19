import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignParent = () => {
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedParent, setSelectedParent] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch parents and students concurrently
        const [parentResponse, studentResponse] = await Promise.all([
          fetch('http://localhost:8080/getParents'),
          fetch('http://localhost:8080/getStudents'),
        ]);

        if (!parentResponse.ok || !studentResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const parentData = await parentResponse.json();
        const studentData = await studentResponse.json();

        setParents(parentData);
        setStudents(studentData);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedParent || !selectedStudent) {
      setError('Please select both Parent and Student.');
      setSuccess(null);
      return;
    }

    const data = {
      uid: selectedParent
    };

    try {
      const response = await fetch(`http://localhost:8080/assignParent/${selectedStudent}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();

      setSuccess('Parent successfully assigned to student.');
      setError(null);
      console.log('Success:', result);
    } catch (error) {
      setError(error.message || 'Error assigning parent to student.');
      setSuccess(null);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Assign Parent</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Parent:</label>
          <select
            className="form-control"
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
            disabled={loading}
          >
            <option value="">Select Parent</option>
            {parents.map(parent => (
              <option key={parent.uid} value={parent.uid}>
                {parent.uid} {parent.fname} {parent.lname}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label>Student:</label>
          <select
            className="form-control"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            disabled={loading}
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.sid} value={student.sid}>
                {student.sid} {student.fname} {student.mname} {student.lname}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button 
          className="btn btn-primary btn-block" 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Assigning...' : 'Assign'}
        </button>
      </form>
    </div>
  );
};

export default AssignParent;
