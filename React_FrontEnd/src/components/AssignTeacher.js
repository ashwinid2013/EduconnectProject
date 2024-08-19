import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignTeacher = () => {
  const [years, setYears] = useState([]);
  const [standards, setStandards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/getYears')
      .then(response => response.json())
      .then(data => setYears(data))
      .catch(error => {
        console.error('Error fetching years:', error);
        setError('Failed to load years. Please try again later.');
      });

    fetch('http://localhost:8080/getStandards')
      .then(response => response.json())
      .then(data => setStandards(data))
      .catch(error => {
        console.error('Error fetching standards:', error);
        setError('Failed to load standards. Please try again later.');
      });

    fetch('http://localhost:8080/getSubjects')
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => {
        console.error('Error fetching subjects:', error);
        setError('Failed to load subjects. Please try again later.');
      });

    fetch('http://localhost:8080/getTeachers')
      .then(response => response.json())
      .then(data => setTeachers(data))
      .catch(error => {
        console.error('Error fetching teachers:', error);
        setError('Failed to load teachers. Please try again later.');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedYear || !selectedStandard || !selectedSubject || !selectedTeacher) {
      setError('Please select all fields.');
      return;
    }
    console.log(selectedStandard+":"+selectedSubject+":"+selectedTeacher+":"+selectedYear)
    const url = `http://localhost:8080/assignTeacher/${selectedStandard}/${selectedSubject}/${selectedTeacher}/${selectedYear}`;
 
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        else
        {
          setMessage('Assigned successfully!');
          setError('');

        }
        return response.json();
      })
     
      .catch(error => {
        console.error('Error assigning teacher:', error);
        setError('Failed to assign teacher. Please try again.');
        setMessage('');
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Assign Teacher</h1>
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
          <label>Subject:</label>
          <select
            className="form-control"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.sub_id} value={subject.sub_id}>{subject.sub_name}</option>
            ))}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label>Teacher:</label>
          <select
            className="form-control"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.uid} value={teacher.uid}>{teacher.fname} {teacher.lname}</option>
            ))}
          </select>
        </div>
        <br />
        <button type="submit" className="btn btn-primary btn-block">Assign</button>
      </form>
      <br />

      {message && <div className="alert alert-success mt-4">{message}</div>}
      {error && <div className="alert alert-danger mt-4">{error}</div>}
    </div>
  );
};

export default AssignTeacher;
