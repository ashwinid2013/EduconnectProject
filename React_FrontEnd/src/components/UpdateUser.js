import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUser = () => {
    const [uid, setuid] = useState('');
    const [username, setusername] = useState('');
    const [Password, setPassword] = useState('');
    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [address, setaddress] = useState('');
    const [contactNo, setcontactNo] = useState('');
    const [email, setemail] = useState('');
    const [status, setstatus] = useState(0);
    const [rid, setrid] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [areaid, setareaid] = useState('');
    const [errors, setErrors] = useState({});
    const [Roles, setRoles] = useState([]);
    const [Areas, setAreas] = useState([]);
    const [cities, setCities] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchrids();
        fetchCities();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            fetchareaids(selectedCity.cityid); // Fetch areas when city changes
        } else {
            setAreas([]);
            setareaid('');
        }
    }, [selectedCity]);

    useEffect(() => {
        if (rid) {
            fetchUsersByRole(rid);
        } else {
            setUsers([]);
        }
    }, [rid]);

    const fetchrids = async () => {
        try {
            const response = await fetch('https://localhost:7028/api/UserManagement/GetRoles');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchareaids = async (cityId) => {
        try {
            const response = await fetch(`https://localhost:7028/api/UserManagement/GetArea?id=${cityId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setAreas(data);
        } catch (error) {
            console.error('Error fetching areaids:', error);
        }
    };

    const fetchCities = async () => {
        try {
            const response = await fetch('https://localhost:7028/api/UserManagement/GetCity');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const fetchUsersByRole = async (roleId) => {
        try {
            const response = await fetch(`https://localhost:7028/api/UserManagement/GetLoginWithRole?id=${roleId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserDetails = async (userid) => {
        try {
            const response = await fetch(`https://localhost:7028/api/UserManagement/GetLog?id=${userid}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setSelectedUser(data);
            setuid(data.uid);
            setusername(data.username);
            setPassword(data.password);
            setFirstName(data.fname);
            setLastName(data.lname);
            setaddress(data.address);
            setcontactNo(data.contactNo);
            setemail(data.email);
            setstatus(data.status);
            setSelectedCity(cities.find(city => city.cityid === data.cityId) || null); // Handle cityId
            setareaid(data.areaid || ''); // Handle areaid
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                uid,
                username,
                Password,
                fname,
                lname,
                address,
                contactNo,
                email,
                rid,
                areaid,
                status
            };

            try {
                console.log(JSON.stringify(formData))
                const response = await fetch('https://localhost:7028/api/UserManagement/UpdateUser', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'

                    },
                    
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                console.log('User updated successfully:', result);
                setMessage('User updated successfully.');
                fetchUsersByRole(rid); // Refresh the user list
                handleReset();
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    };

    const handleReset = () => {
        setusername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setaddress('');
        setcontactNo('');
        setemail('');
        setrid('');
        setSelectedCity(null);
        setareaid('');
        setErrors({});
        setSelectedUser(null);
        setMessage('');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'username is required';
        if (!Password) newErrors.Password = 'Password is required';
        if (!fname) newErrors.fname = 'First Name is required';
        if (!lname) newErrors.lname = 'Last Name is required';
        if (!address) newErrors.address = 'address is required';
        if (!contactNo) {
            newErrors.contactNo = 'Contact Number is required';
        } else if (!/^\d{10}$/.test(contactNo)) {
            newErrors.contactNo = 'Contact Number must be 10 digits';
        }
        if (!email) {
            newErrors.email = 'email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'email address is invalid';
        }
        if (!rid) newErrors.rid = 'User Type is required';
        if (!selectedCity) newErrors.city = 'City is required';
        if (!areaid) newErrors.areaid = 'areaid is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        switch (name) {
            case 'username':
                if (!value) {
                    newErrors.username = 'username is required';
                } else {
                    delete newErrors.username;
                }
                break;
            case 'Password':
                if (!value) {
                    newErrors.Password = 'Password is required';
                } else {
                    delete newErrors.Password;
                }
                break;
            case 'fname':
                if (!value) {
                    newErrors.fname = 'First Name is required';
                } else {
                    delete newErrors.fname;
                }
                break;
            case 'lname':
                if (!value) {
                    newErrors.lname = 'Last Name is required';
                } else {
                    delete newErrors.lname;
                }
                break;
            case 'address':
                if (!value) {
                    newErrors.address = 'address is required';
                } else {
                    delete newErrors.address;
                }
                break;
            case 'contactNo':
                if (!value) {
                    newErrors.contactNo = 'Contact Number is required';
                } else if (!/^\d{10}$/.test(value)) {
                    newErrors.contactNo = 'Contact Number must be 10 digits';
                } else {
                    delete newErrors.contactNo;
                }
                break;
            case 'email':
                if (!value) {
                    newErrors.email = 'email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = 'email address is invalid';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'rid':
                if (!value) {
                    newErrors.rid = 'User Type is required';
                } else {
                    delete newErrors.rid;
                }
                break;
            case 'city':
                if (!value) {
                    newErrors.city = 'City is required';
                } else {
                    delete newErrors.city;
                }
                break;
            case 'areaid':
                if (!value) {
                    newErrors.areaid = 'areaid is required';
                } else {
                    delete newErrors.areaid;
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    return (
        <div className="container" style={{ maxWidth: '800px', marginTop: '20px' }}>
            <div className="card">
                <div className="card-header bg-primary text-white">Update User</div>
                <div className="card-body">
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">User Role</label>
                            <select
                                className={`form-control ${errors.rid ? 'is-invalid' : ''}`}
                                value={rid}
                                onChange={(e) => {
                                    setrid(e.target.value);
                                    validateField('rid', e.target.value);
                                }}
                            >
                                <option value="">Select User Type</option>
                                {Roles.map((role) => (
                                    <option key={role.rid} value={role.rid}>
                                        {role.roleName}
                                    </option>
                                ))}
                            </select>
                            {errors.rid && <div className="invalid-feedback">{errors.rid}</div>}
                        </div>

                        {rid && (
                            <div className="mb-3">
                                <label className="form-label">Select User</label>
                                <select
                                    className="form-control"
                                    value={selectedUser ? selectedUser.uid : ''}
                                    onChange={(e) => fetchUserDetails(e.target.value)}
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.uid} value={user.uid}>
                                            {user.fname} {user.lname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {selectedUser && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">username</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        value={username}
                                        onChange={(e) => {
                                            setusername(e.target.value);
                                            validateField('username', e.target.value);
                                        }}
                                    />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
                                        value={Password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            validateField('Password', e.target.value);
                                        }}
                                    />
                                    {errors.Password && <div className="invalid-feedback">{errors.Password}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                                        value={fname}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            validateField('fname', e.target.value);
                                        }}
                                    />
                                    {errors.fname && <div className="invalid-feedback">{errors.fname}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                                        value={lname}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            validateField('lname', e.target.value);
                                        }}
                                    />
                                    {errors.lname && <div className="invalid-feedback">{errors.lname}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">address</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        value={address}
                                        onChange={(e) => {
                                            setaddress(e.target.value);
                                            validateField('address', e.target.value);
                                        }}
                                    />
                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contact No</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.contactNo ? 'is-invalid' : ''}`}
                                        value={contactNo}
                                        onChange={(e) => {
                                            setcontactNo(e.target.value);
                                            validateField('contactNo', e.target.value);
                                        }}
                                    />
                                    {errors.contactNo && <div className="invalid-feedback">{errors.contactNo}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={email}
                                        onChange={(e) => {
                                            setemail(e.target.value);
                                            validateField('email', e.target.value);
                                        }}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <select
                                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                        value={selectedCity ? selectedCity.cityid : ''}
                                        onChange={(e) => {
                                            const selected = cities.find(city => city.cityid === parseInt(e.target.value));
                                            setSelectedCity(selected);
                                            validateField('city', selected);
                                        }}
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city.cityid} value={city.cityid}>
                                                {city.cityname}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                </div>

                                {selectedCity && (
                                    <div className="mb-3">
                                        <label className="form-label">Area</label>
                                        <select
                                            className={`form-control ${errors.areaid ? 'is-invalid' : ''}`}
                                            value={areaid}
                                            onChange={(e) => {
                                                setareaid(e.target.value);
                                                validateField('areaid', e.target.value);
                                            }}
                                        >
                                            <option value="">Select Area</option>
                                            {Areas.map((area) => (
                                                <option key={area.areaid} value={area.areaid}>
                                                    {area.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.areaid && <div className="invalid-feedback">{errors.areaid}</div>}
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label">status</label>
                                    <select
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setstatus(e.target.value)}
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                                <button type="button" className="btn btn-secondary ms-2" onClick={handleReset}>
                                    Reset
                                </button>
                                {message && <div className="alert alert-success mt-3">{message}</div>}
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
