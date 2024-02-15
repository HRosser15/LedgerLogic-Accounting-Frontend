import React, { useState } from 'react';
import { registerUser } from '../../services/AuthService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CreateNewUser.module.css';

const CreateNewUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        streetAddress: '',
        status: 'false'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const registerUserHandler = async () => {
        try {
            const response = await registerUser(formData);

            if (response.status === 201) {
                console.log('Registration successful');
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={`container ${styles.formContainer}`}>
            <h2>Registration Test</h2>

            <form onSubmit={(e) => {e.preventDefault(); registerUserHandler(); }} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        id="role"
                        className="form-select"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <div className="col-md-6">
                  <label htmlFor="streetAddress" className="form-label">Street Address</label>
                  <input
                      type="text"
                      className="form-control"
                      id="streetAddress"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      placeholder="1234 Main Street"
                  />
                </div>

                <div className="col-md-4">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        placeholder="Atlanta"
                    />
                </div>

                <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select
                id="state"
                className="form-select"
                name="state"
              >
                <option value="" disabled>Choose...</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>

                <div className="col">
                    <label htmlFor="zipCode" className="form-label">ZIP Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        name="zipCode"
                    />
                </div>

                <div className="mb-3">
                  <label htmlFor="securityAnswer1" className="form-label">What was the name of your first pet?</label>
                  <input
                    type="text"
                    className="form-control"
                    id="securityAnswer1"
                    name="securityAnswer1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="securityAnswer2" className="form-label">What is your mother's maiden name?</label>
                  <input
                    type="text"
                    className="form-control"
                    id="securityAnswer2"
                    name="securityAnswer2"
                  />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewUser;
