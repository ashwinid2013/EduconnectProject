import React, { useState, useEffect } from 'react';

export default function ViewAssignedClasses() {
    const [TeacherSubjectList, setTeacherSubjectList] = useState([]);
    const TeacherProfile = JSON.parse(localStorage.getItem("loggedUser"));
    const tid = TeacherProfile.username.uid;
    console.log("Teacher id", tid);

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
                console.error('Error fetching data:', error);
                setTeacherSubjectList([]);
            });
    }, [tid]);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Teacher's Assigned Classes</h2>
            {TeacherSubjectList.length > 0 ? (
                <table className='table table-bordered'>
                    <thead className="thead-dark">
                        <tr>
                            <th>Sr.No</th>
                            <th>Standard</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TeacherSubjectList.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.std_id.std_name}</td>
                                <td>{item.sub_id.sub_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-muted">No subjects assigned.</p>
            )}
        </div>
    );
}
