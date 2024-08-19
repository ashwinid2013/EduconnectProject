import React, { useState, useEffect } from 'react';

export default function AddMarks() {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [examTypes, setExamTypes] = useState([]);
    const [teacherSubjectList, setTeacherSubjectList] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [StudentDetails, setStudentDetails] = useState([]);
    const [selectedExamType, setSelectedExamType] = useState('');
    const [selectedStandard, setSelectedStandard] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [marks, setMarks] = useState('');
    const [message, setMessage] = useState('');
    const [comment, setComment] = useState('');
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
            .then(data => setTeacherSubjectList(Array.isArray(data) ? data : []))
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
                .then(data => setSubjects(Array.isArray(data) ? data : []))
                .catch(error => {
                    console.error('Error fetching subjects:', error);
                    setSubjects([]);
                });
        } else {
            setSubjects([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!selectedYear || !selectedExamType || !selectedStandard || !selectedSubject || !selectedStudent || !marks) {
            setMessage('Please fill out all fields before submitting.');
            return;
        }

        const formData = {
            tid: tid,
            stdid: selectedStandard,
            yearid: selectedYear,
            typeid: selectedExamType,
            subid: selectedSubject,
            studid: selectedStudent,
            comment: comment,
            marks: marks,
        };

        fetch('http://localhost:8080/addMarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setMessage('Marks assigned successfully!');
                    setSelectedYear('');
                    setSelectedExamType('');
                    setSelectedStandard('');
                    setSelectedSubject('');
                    setSelectedStudent('');
                    setMarks('');
                    setComment('');
                }
            })
            .catch(error => {
                console.error('Error saving marks:', error);
                setMessage('Failed to assign marks. Please try again.');
            });
    };

    return (
        <div className="container mt-4">
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <h4>Add Marks</h4>
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

                <div className="form-group" style={{ paddingTop: 20 }}>
                    <label htmlFor="studentSelect">Select Student:</label>
                    <select
                        id="studentSelect"
                        className="form-select form-control"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Select Student</option>
                        {StudentDetails.map((student) => (
                            <option key={student.sid} value={student.sid}>
                                {student.fname} {student.lname}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group" style={{ paddingTop: 20 }}>
                    <label htmlFor="marksInput">Enter Marks:</label>
                    <input
                        type="text"
                        id="marksInput"
                        className="form-control"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        placeholder="Enter Marks"
                    />
                </div>

                <div className="form-group" style={{ paddingTop: 20 }}>
                    <label htmlFor="marksComment">Enter Comment:</label>
                    <input
                        type="text"
                        id="marksComment"
                        className="form-control"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter Comment"
                    />
                </div>

                <div style={{ paddingTop: 20 }}></div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
