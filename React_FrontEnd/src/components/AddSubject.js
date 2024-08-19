import React, { useState } from 'react';

const AddSubject = () => {
    const [subject, setSubject] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Inline style objects
    const containerStyle = {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    };

    const descriptionStyle = {
        fontSize: '16px',
        color: '#333',
        marginBottom: '15px',
    };

    const inputStyle = {
        width: 'calc(100% - 2px)',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    };

    const buttonStyle = {
        background: 'linear-gradient(135deg, #007bff, #0056b3)',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
    };

    const buttonHoverStyle = {
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    };

    const errorStyle = {
        color: 'red',
        marginBottom: '15px',
    };

    const successStyle = {
        color: 'green',
        marginBottom: '15px',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (subject.trim() === '') {
            setError('Subject name is required');
            return;
        }
        setError('');

        try {
            const response = await fetch('https://localhost:7028/api/UserManagement/SaveSubject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subName:subject  }),
            });

            if (response.ok) {
                setSuccess('Subject successfully added');
                setSubject('');
            } else {
                setError('Failed to add subject');
            }
        } catch (error) {
            setError('An error occurred while adding the subject');
        }
    };

    return (
        <div style={containerStyle}>
            <p style={descriptionStyle}>Create a new subject:</p>
            
            <form onSubmit={handleSubmit}>
                <input
                    style={inputStyle}
                    type="text"
                    id="subject"
                    placeholder="Enter subject name"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => e.currentTarget.style.boxShadow = buttonHoverStyle.boxShadow}
                    onMouseOut={(e) => e.currentTarget.style.boxShadow = buttonStyle.boxShadow}
                >
                    Create Subject
                </button>
                <br/><br/>

                {error && <p style={errorStyle}>{error}</p>}
            {success && <p style={successStyle}>{success}</p>}
            </form>
        </div>
    );
};

export default AddSubject;
