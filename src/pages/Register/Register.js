import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const host = 'http://localhost:3001/users'

function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [address, setAddress] = useState('');
	const [notification, setNotification] = useState('');
	// Add event handlers to update state for each input field

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handlePhoneNumberChange = (e) => {
		setPhoneNumber(e.target.value);
	};

	const handleAddressChange = (e) => {
		setAddress(e.target.value);
	};

	// Add a submit handler to handle form submission

	const handleSubmit = (e) => {
		e.preventDefault();

		// Implement registration logic here.
		// You can send the form data to your backend API for registration.
		// Consider making an HTTP POST request to your registration endpoint.

		const formData = {
			name,
			email,
			password,
			phoneNumber,
			address,
		};
		console.log(formData);
		axios.post(`${host}/register`, formData, {
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true, // Add this line to include credentials
		})
			.then(response => {
				console.log(response);
				if (response.status === 201) {
					setNotification('Created Successfully, check your email to activate account!!')
				}
			})
			.catch(error => {
				console.log(error);
			})

		// Reset the form fields after submission
		setName('');
		setEmail('');
		setPassword('');
		setPhoneNumber('');
		setAddress('');
	};

	// Inside the RegistrationForm component
	return (
		<div className="registration-container">
			<h2>Registration</h2>
			<h3 style={{ color: 'red' }}>{notification}</h3>
			<form className="registration-form" onSubmit={handleSubmit}>
				{/* Name */}
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={handleNameChange}
						required
					/>
				</div>

				{/* Email */}
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleEmailChange}
						required
					/>
				</div>

				{/* Password */}
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={handlePasswordChange}
						required
					/>
				</div>

				{/* Phone Number */}
				<div>
					<label htmlFor="phoneNumber">Phone Number:</label>
					<input
						type="tel"
						id="phoneNumber"
						name="phoneNumber"
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
						required
					/>
				</div>

				{/* Address */}
				<div>
					<label htmlFor="address">Address:</label>
					<textarea
						id="address"
						name="address"
						value={address}
						onChange={handleAddressChange}
						required
					/>
				</div>

				{/* Submit Button */}
				<div>
					<button type="submit">Register</button><br/>
					<Link to='/login'>Already have account? Back to login</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;
