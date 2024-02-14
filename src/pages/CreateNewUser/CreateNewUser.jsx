import React, { useState } from 'react';
import SignUpService from '../../services/SignUpService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CreateNewUser.module.css';

const CreateNewUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    birthDay: null,
    password: '',
    passwordConfirm: '',
    securityAnswer1: '',
    securityAnswer2: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dob: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call SignUpService 
      const response = await SignUpService.createPendingUser(formData);

      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="styles.formContainer">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              aria-label="First name"
            />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              aria-label="Last name"
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              aria-label="Email"
            />
          </div>

          <div className="col">
            <label htmlFor="dob" className="form-label"></label>
            <DatePicker
              className="form-control"
              selected={formData.dob}
              onChange={handleDateChange}
              placeholderText="Select Date of Birth"
              dateFormat="MM/dd/yyyy"
              isClearable
            />
          </div>
        </div>
            </form>
        
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className="row g-3">
            
            <div className="col-12">
              <label htmlFor="streetAddress" className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="1234 Main St"
              />
            </div>
    
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Atlanta"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select
                id="state"
                className="form-select"
                name="state"
                value={formData.state}
                onChange={handleChange}
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
            <div className="col-md-2">
              <label htmlFor="zipCode" className="form-label">ZIP Code</label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="ZIP"
              />
            </div>
          </form>
        <div className="mb-3">
          <label htmlFor="securityAnswer1" className="form-label">What was the name of your first pet?</label>
          <input
            type="text"
            className="form-control"
            id="securityAnswer1"
            name="securityAnswer1"
            value={formData.securityAnswer1}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="securityAnswer2" className="form-label">What is your mother's maiden name?</label>
          <input
            type="text"
            className="form-control"
            id="securityAnswer2"
            name="securityAnswer2"
            value={formData.securityAnswer2}
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
          <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
        </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">Create User</button>
            </div>
    </div>
    
    
  );
};
export default CreateNewUser;
