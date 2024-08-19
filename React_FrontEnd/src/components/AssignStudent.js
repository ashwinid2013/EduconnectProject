import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignStudent = () => {
  const [years, setYears] = useState([]);
  const [standards, setStandards] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearResponse = await fetch('http://localhost:8080/getYears');
        const yearData = await yearResponse.json();
        setYears(yearData);

        const standardResponse = await fetch('http://localhost:8080/getStandards');
        const standardData = await standardResponse.json();
        setStandards(standardData);

        const studentResponse = await fetch('http://localhost:8080/getStudents');
        const studentData = await studentResponse.json();
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

    if (!selectedYear || !selectedStandard || !selectedStudent) {
      setError('Please select Year, Standard, and Student.');
      setSuccess(null);
      return;
    }

    const data = {
      sid: selectedStudent,
      yid: selectedYear,
      std_id: selectedStandard
    };

    try {
      const response = await fetch('http://localhost:8080/saveClassStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setSuccess('Student successfully assigned.');
      setError(null);
      console.log('Success:', result);
    } catch (error) {
      setError('Error assigning student.');
      setSuccess(null);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Assign Student</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Year:</label>
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
        <br />
        <div className="form-group">
          <label>Standard:</label>
          <select
            className="form-control"
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
          >
            <option value="">Select Standard</option>
            {standards.map(standard => (
              <option key={standard.std_id} value={standard.std_id}>{standard.std_name}</option>
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
        <button className="btn btn-primary btn-block" type="submit">Assign</button>
      </form>

      {setYears}
      {setStandards}
      {setStudents}
    </div>
  );
};

export default AssignStudent;
