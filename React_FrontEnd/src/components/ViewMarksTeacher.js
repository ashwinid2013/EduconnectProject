import React, { useState, useEffect } from 'react';

export default function ViewMarksTeacher() {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [examTypes, setExamTypes] = useState([]);
    const [teacherSubjectList, setTeacherSubjectList] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [studentDetails, setStudentDetails] = useState([]);
    const [selectedExamType, setSelectedExamType] = useState('');
    const [selectedStandard, setSelectedStandard] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [marks, setMarks] = useState([]);
    const [error, setError] = useState('');
    const [noMarksAvailable, setNoMarksAvailable] = useState(false); // New state for no marks message
    const TeacherProfile = JSON.parse(localStorage.getItem("loggedUser"));
    const tid = TeacherProfile.username.uid;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    students.map((classStudent) =>
                        fetch(`http://localhost:8080/getStudentById/${classStudent.sid}`).then((response) =>
                            response.json()
                        )
                    )
                );
                setStudentDetails(responses);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [students]);

    useEffect(() => {
        fetch(`http://localhost:8080/getClassTeachersByTeacherId/${tid}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTeacherSubjectList(data);
                } else {
                    console.error('Unexpected API response, expected an array:', data);
                    setTeacherSubjectList([]);
                }
            })
            .catch(error => {
                console.error('Error fetching teacher subject list:', error);
                setTeacherSubjectList([]);
            });
    }, [tid]);

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
        if (selectedStandard) {
            fetch(`http://localhost:8080/getClassStudentsByStandard/${selectedStandard}`)
                .then(response => response.json())
                .then(data => setStudents(data))
                .catch(error => {
                    console.error('Error fetching students:', error);
                    setStudents([]);
                });
        }
    }, [selectedStandard]);

    const getUniqueStandards = () => {
        const uniqueStandards = [];
        const standardMap = new Map();

        teacherSubjectList.forEach(option => {
            if (!standardMap.has(option.std_id.std_id)) {
                standardMap.set(option.std_id.std_id, true);
                uniqueStandards.push(option);
            }
        });

        return uniqueStandards;
    };

    const handleStandardChange = (e) => {
        const selectedStandard = e.target.value;
        setSelectedStandard(selectedStandard);
        setSelectedSubject('');

        if (selectedStandard) {
            fetch(`http://localhost:8080/getSubjectsByTeacherandStandard/${tid}/${selectedStandard}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setSubjects(data);
                    } else {
                        console.error('Unexpected API response, expected an array:', data);
                        setSubjects([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                    setSubjects([]);
                });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (!selectedYear || !selectedExamType || !selectedStandard || !selectedSubject) {
            setError('Please fill in all the required fields.');
            setMarks([]);
            setNoMarksAvailable(false); // Reset no marks message
            return;
        }

        const url = `http://localhost:8080/viewMarksByTeacherID/${selectedYear}/${selectedExamType}/${selectedStandard}/${tid}/${selectedSubject}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                setMarks(data);
                setError('');
                setNoMarksAvailable(false); // Reset no marks message
            } else {
                console.error('Unexpected API response, expected a non-empty array:', data);
                setMarks([]);
                setNoMarksAvailable(true); // Show no marks message
            }
        } catch (error) {
            console.error('Error fetching marks:', error);
            setMarks([]);
            setNoMarksAvailable(false); // Reset no marks message
            setError('Error fetching marks.');
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <h4>View Marks</h4>
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

                <div className="form-group">
                    <label htmlFor="standardSelect">Select Standard:</label>
                    <select
                        id="standardSelect"
                        className="form-select form-control"
                        value={selectedStandard}
                        onChange={handleStandardChange}
                    >
                        <option value="">Select Standard</option>
                        {getUniqueStandards().map((option) => (
                            <option key={option.std_id.std_id} value={option.std_id.std_id}>
                                {option.std_id.std_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group" style={{ paddingTop: 20 }}>
                    <label htmlFor="subjectSelect">Select Subject:</label>
                    <select
                        id="subjectSelect"
                        className="form-select form-control"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        <option value="">Select Subject</option>
                        {subjects.map((option) => (
                            <option key={option.sub_id.sub_id} value={option.sub_id.sub_id}>
                                {option.sub_id.sub_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ paddingTop: 20 }}></div>
                <button type="submit" className="btn btn-primary">View Marks</button>
            </form>

            {error && (
                <div className="mt-4">
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            )}

            {marks.length > 0 && (
                <div className="mt-4">
                    <h4>Marks Details</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Subject</th>
                                <th>Obtained Marks</th>
                                <th>Out of Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((mark, index) => (
                                <tr key={mark.stud_id.sid}>
                                    <td>{index + 1}</td>
                                    <td>{mark.stud_id.sid}</td>
                                    <td>{mark.stud_id.fname} {mark.stud_id.lname}</td>
                                    <td>{mark.sub_id.sub_name}</td>
                                    <td>{mark.obtainedmarks}</td>
                                    <td>{mark.type_id.marks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {noMarksAvailable && (
                <div className="mt-4">
                    <p>Marks Not Available</p>
                </div>
            )}
        </div>
    );
}
