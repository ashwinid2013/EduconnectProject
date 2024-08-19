import React, { useState, useEffect } from 'react';

export default function UploadHomework() {
    const [TeacherSubjectList, setTeacherSubjectList] = useState([]);
    const [Subjects, setSubjects] = useState([]);
    const [Description, setDescription] = useState('');
    const [SelectedStandard, setSelectedStandard] = useState('');
    const [SelectedSubject, setSelectedSubject] = useState('');
    const [AssignDate, setAssignDate] = useState('');
    const [SubmissionDate, setSubmissionDate] = useState('');
    const [SuccessMessage, setSuccessMessage] = useState('');
    const [Errors, setErrors] = useState({});
    const TeacherProfile = JSON.parse(localStorage.getItem("loggedUser"));
    const tid = TeacherProfile.username.uid;

    
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

    const getUniqueStandards = () => {
        const uniqueStandards = [];
        const standardMap = new Map();

        TeacherSubjectList.forEach(option => {
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
        setSelectedSubject(''); // Reset the subject selection when standard changes
        setErrors(prevErrors => ({ ...prevErrors, standard: '' }));

        if (selectedStandard) {
            // Fetch subjects based on the selected standard and teacher ID
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
        } else {
            setSubjects([]);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!SelectedStandard) newErrors.standard = 'Standard is required';
        if (!SelectedSubject) newErrors.subject = 'Subject is required';
        if (!Description) newErrors.description = 'Description is required';
        if (!AssignDate) newErrors.assignDate = 'Assign date is required';
        if (!SubmissionDate) newErrors.submissionDate = 'Submission date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return; // Don't submit the form if there are validation errors
        }

        const formData = {
            standardId: SelectedStandard,
            subjectId: SelectedSubject,
            description: Description,
            assignDate: AssignDate,
            submitDate: SubmissionDate,
            teacherId: tid
        };

        fetch('http://localhost:8080/addHomework', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                setSuccessMessage('Homework saved successfully!');
            } else {
                setSuccessMessage('Failed to save homework.');
            }
        })
        .catch(error => {
            console.error('Error submitting homework:', error);
            setSuccessMessage('Error occurred while saving homework.');
        });
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <h4>Add Homework</h4>
                <div className="form-group">
                    <label htmlFor="select1">Select Standard:</label>
                    <select
                        id="select1"
                        className={`form-select form-control ${Errors.standard && 'is-invalid'}`}
                        value={SelectedStandard}
                        onChange={handleStandardChange}
                    >
                        <option value="">Select Standard</option>
                        {getUniqueStandards().map((option) => (
                            <option key={option.std_id.std_id} value={option.std_id.std_id}>
                                {option.std_id.std_name}
                            </option>
                        ))}
                    </select>
                    {Errors.standard && <div className="invalid-feedback">{Errors.standard}</div>}
                </div>

                <div className="form-group" style={{ paddingTop: 20 }}>
                    <label htmlFor="select2">Select Subject:</label>
                    <select
                        id="select2"
                        className={`form-select form-control ${Errors.subject && 'is-invalid'}`}
                        value={SelectedSubject}
                        onChange={(e) => {
                            setSelectedSubject(e.target.value);
                            setErrors(prevErrors => ({ ...prevErrors, subject: '' }));
                        }}
                        disabled={!SelectedStandard}
                    >
                        <option value="">Select Subject</option>
                        {Subjects.map((option) => (
                            <option key={option.sub_id.sub_id} value={option.sub_id.sub_id}>
                                {option.sub_id.sub_name}
                            </option>
                        ))}
                    </select>
                    {Errors.subject && <div className="invalid-feedback">{Errors.subject}</div>}
                </div>

                <div className="form-group" style={{ paddingTop: 20 }}>
                    <label htmlFor="Description">Description:</label>
                    <input
                        type="text"
                        id="Description"
                        className={`form-control ${Errors.description && 'is-invalid'}`}
                        value={Description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setErrors(prevErrors => ({ ...prevErrors, description: '' }));
                        }}
                        placeholder="Enter some text"
                    />
                    {Errors.description && <div className="invalid-feedback">{Errors.description}</div>}
                </div>

                <div className="form-group" style={{ paddingTop: 20 }}>
                    <label htmlFor="AssignDate">Assign Date:</label>
                    <input
                        type="date"
                        id="AssignDate"
                        className={`form-control ${Errors.assignDate && 'is-invalid'}`}
                        value={AssignDate}
                        onChange={(e) => {
                            setAssignDate(e.target.value);
                            setErrors(prevErrors => ({ ...prevErrors, assignDate: '' }));
                        }}
                    />
                    {Errors.assignDate && <div className="invalid-feedback">{Errors.assignDate}</div>}
                </div>

                <div className="form-group" style={{ paddingTop: 20 }}>
                    <label htmlFor="SubmissionDate">Submission Date:</label>
                    <input
                        type="date"
                        id="SubmissionDate"
                        className={`form-control ${Errors.submissionDate && 'is-invalid'}`}
                        value={SubmissionDate}
                        onChange={(e) => {
                            setSubmissionDate(e.target.value);
                            setErrors(prevErrors => ({ ...prevErrors, submissionDate: '' }));
                        }}
                    />
                    {Errors.submissionDate && <div className="invalid-feedback">{Errors.submissionDate}</div>}
                </div>

                <div style={{ paddingTop: 20 }}></div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {SuccessMessage && (
                <div className="alert alert-success mt-4" role="alert">
                    {SuccessMessage}
                </div>
            )}
        </div>
    );
}
