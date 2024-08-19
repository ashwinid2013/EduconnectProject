import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser2 = () => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Fname, setFirstName] = useState('');
    const [Lname, setLastName] = useState('');
    const [Address, setAddress] = useState('');
    const [ContactNo, setContactNo] = useState('');
    const [Email, setEmail] = useState('');
    const [Status, setStatus] = useState(0);
    const [Rid, setRid] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [Areaid, setAreaid] = useState('');
    const [errors, setErrors] = useState({});
    const [Roles, setRoles] = useState([]);
    const [Areas, setAreas] = useState([]);
    const [cities, setCities] = useState([]);
    const [successmsg,setsuccessmsg]=useState('');

    useEffect(() => {
        fetchRids();
        fetchCities();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            fetchAreaids(selectedCity.cityid); // Corrected to use cityid
        } else {
            setAreas([]);
            setAreaid('');
        }
    }, [selectedCity]);

    const fetchRids = async () => {
        try {
            const response = await fetch('https://localhost:7028/api/UserManagement/GetRoles');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const fdata = data.filter(role=>role.roleName !== 'Admin')
            setRoles(fdata);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchAreaids = async (cityId) => {
        try {
            const response = await fetch(`https://localhost:7028/api/UserManagement/GetArea?id=${cityId}`); // Corrected URL
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setAreas(data);
        } catch (error) {
            console.error('Error fetching Areaids:', error);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                Username,
                Password,
                Fname,
                Lname,
                Address,
                ContactNo,
                Email,
                Rid,
                Areaid,
                Status
            };

            try {
                const response = await fetch('https://localhost:7028/api/UserManagement/SaveUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                if(result)
                {
                    setsuccessmsg("User Registered successfully");
                }

                console.log('User Registered successfully:', result);
                handleReset(); // Optionally reset form after successful submission
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    const handleReset = () => {
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setAddress('');
        setContactNo('');
        setEmail('');
        setRid('');
        setSelectedCity(null);
        setAreaid('');
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!Username) newErrors.Username = 'Username is required';
        if (!Password) newErrors.Password = 'Password is required';
        if (!Fname) newErrors.Fname = 'First Name is required';
        if (!Lname) newErrors.Lname = 'Last Name is required';
        if (!Address) newErrors.Address = 'Address is required';
        if (!ContactNo) {
            newErrors.ContactNo = 'Contact Number is required';
        } else if (!/^\d{10}$/.test(ContactNo)) {
            newErrors.ContactNo = 'Contact Number must be 10 digits';
        }
        if (!Email) {
            newErrors.Email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(Email)) {
            newErrors.Email = 'Email Address is invalid';
        }
        if (!Rid) newErrors.Rid = 'User Type is required';
        if (!selectedCity) newErrors.city = 'City is required';
        if (!Areaid) newErrors.Areaid = 'Areaid is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        switch (name) {
            case 'Username':
                if (!value) {
                    newErrors.Username = 'Username is required';
                } else {
                    delete newErrors.Username;
                }
                break;
            case 'Password':
                if (!value) {
                    newErrors.Password = 'Password is required';
                } else {
                    delete newErrors.Password;
                }
                break;
            case 'Fname':
                if (!value) {
                    newErrors.Fname = 'First Name is required';
                } else {
                    delete newErrors.Fname;
                }
                break;
            case 'Lname':
                if (!value) {
                    newErrors.Lname = 'Last Name is required';
                } else {
                    delete newErrors.Lname;
                }
                break;
            case 'Address':
                if (!value) {
                    newErrors.Address = 'Address is required';
                } else {
                    delete newErrors.Address;
                }
                break;
            case 'ContactNo':
                if (!value) {
                    newErrors.ContactNo = 'Contact Number is required';
                } else if (!/^\d{10}$/.test(value)) {
                    newErrors.ContactNo = 'Contact Number must be 10 digits';
                } else {
                    delete newErrors.ContactNo;
                }
                break;
            case 'Email':
                if (!value) {
                    newErrors.Email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.Email = 'Email Address is invalid';
                } else {
                    delete newErrors.Email;
                }
                break;
            case 'Rid':
                if (!value) {
                    newErrors.Rid = 'User Type is required';
                } else {
                    delete newErrors.Rid;
                }
                break;
            case 'city':
                if (!value) {
                    newErrors.city = 'City is required';
                } else {
                    delete newErrors.city;
                }
                break;
            case 'Areaid':
                if (!value) {
                    newErrors.Areaid = 'Areaid is required';
                } else {
                    delete newErrors.Areaid;
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    return (
        <div className="container" style={{ maxWidth: '800px', marginTop: '20px' }}>
    <div className="row justify-content-center">
        <div className="col-md-10" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group row" style={{ marginBottom: '15px' }}>
                    <label className="col-sm-3 col-form-label" style={{ fontWeight: 'bold', color: '#333' }}>Select User Type</label>
                    <div className="col-sm-9">
                        <select
                            className="form-control"
                            value={Rid}
                            onChange={(event) => {
                                setRid(event.target.value);
                                validateField('Rid', event.target.value);
                            }}
                            style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                        >
                            <option value="">--Select User Type--</option>
                            {Roles.map((role) => (
                                <option key={role.rid} value={role.rid}>{role.roleName}</option>
                            ))}
                        </select>
                        {errors.Rid && <small className="text-danger" style={{ fontSize: '0.875em', marginTop: '5px', display: 'block' }}>{errors.Rid}</small>}
                    </div>
                </div>
                <br />
                {[
                    { label: 'Username', value: Username, type: 'text', setter: setUsername, error: errors.Username },
                    { label: 'Password', value: Password, type: 'password', setter: setPassword, error: errors.Password },
                    { label: 'First Name', value: Fname, type: 'text', setter: setFirstName, error: errors.Fname },
                    { label: 'Last Name', value: Lname, type: 'text', setter: setLastName, error: errors.Lname },
                    { label: 'Address', value: Address, type: 'textarea', setter: setAddress, error: errors.Address },
                    { label: 'Contact Number', value: ContactNo, type: 'tel', setter: setContactNo, error: errors.ContactNo },
                    { label: 'Email', value: Email, type: 'email', setter: setEmail, error: errors.Email },
                ].map(({ label, value, type, setter, error }, index) => (
                    <div className="form-group row" style={{ marginBottom: '15px' }} key={index}>
                        <label className="col-sm-3 col-form-label" style={{ fontWeight: 'bold', color: '#333' }}>{label}:</label>
                        <div className="col-sm-9">
                            {type === 'textarea' ? (
                                <textarea
                                    className="form-control"
                                    value={value}
                                    onChange={(event) => {
                                        setter(event.target.value);
                                        validateField(label.replace(' ', ''), event.target.value);
                                    }}
                                    style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                />
                            ) : (
                                <input
                                    type={type}
                                    className="form-control"
                                    value={value}
                                    onChange={(event) => {
                                        setter(event.target.value);
                                        validateField(label.replace(' ', ''), event.target.value);
                                    }}
                                    style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                />
                            )}
                            {error && <small className="text-danger" style={{ fontSize: '0.875em', marginTop: '5px', display: 'block' }}>{error}</small>}
                        </div>
                    </div>
                ))}
                <br />
                <div className="form-group row" style={{ marginBottom: '15px' }}>
                    <label className="col-sm-3 col-form-label" style={{ fontWeight: 'bold', color: '#333' }}>Select City</label>
                    <div className="col-sm-9">
                        <select
                            className="form-control"
                            value={selectedCity ? selectedCity.cityid : ''}
                            onChange={(event) => {
                                const city = cities.find(c => c.cityid === parseInt(event.target.value));
                                setSelectedCity(city || null);
                                validateField('city', event.target.value);
                            }}
                            style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                        >
                            <option value="">--Select City--</option>
                            {cities.map((city) => (
                                <option key={city.cityid} value={city.cityid}>{city.cityname}</option>
                            ))}
                        </select>
                        {errors.city && <small className="text-danger" style={{ fontSize: '0.875em', marginTop: '5px', display: 'block' }}>{errors.city}</small>}
                    </div>
                </div>
                <br />
                <div className="form-group row" style={{ marginBottom: '15px' }}>
                    <label className="col-sm-3 col-form-label" style={{ fontWeight: 'bold', color: '#333' }}>Select Area</label>
                    <div className="col-sm-9">
                        <select
                            className="form-control"
                            value={Areaid}
                            onChange={(event) => {
                                setAreaid(event.target.value);
                                validateField('Areaid', event.target.value);
                            }}
                            style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                        >
                            <option value="">--Select Area--</option>
                            {Areas.map((area) => (
                                <option key={area.areaid} value={area.areaid}>{area.name}</option>
                            ))}
                        </select>
                        {errors.Areaid && <small className="text-danger" style={{ fontSize: '0.875em', marginTop: '5px', display: 'block' }}>{errors.Areaid}</small>}
                    </div>
                </div>
                <br />
                <div className="form-group row" style={{ marginBottom: '15px' }}>
                    <label className="col-sm-3 col-form-label" style={{ fontWeight: 'bold', color: '#333' }}>Status:</label>
                    <div className="col-sm-9">
                        <select
                            className="form-control"
                            value={Status}
                            onChange={(event) => {
                                setStatus(parseInt(event.target.value));
                                validateField('Status', event.target.value);
                            }}
                            style={{ border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                        >
                            <option value={0}>Inactive</option>
                            <option value={1}>Active</option>
                        </select>
                        {errors.Status && <small className="text-danger" style={{ fontSize: '0.875em', marginTop: '5px', display: 'block' }}>{errors.Status}</small>}
                    </div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Register
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px' }}>
                    Reset
                </button>
            </form>
            <br />
            {/* <p><strong>Form Data:</strong> {JSON.stringify({
                Username, Password, Fname, Lname, Address, ContactNo, Email, Rid, Areaid, Status
            })}</p> */}

            <p>{successmsg}</p>
        </div>
    </div>
</div>

    )    
};

export default AddUser2;
