import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CONSTANT from '../../utils/Iconstant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// const host = 'https://s9fyy9-3001.csb.app/users'

const host= `${process.env.REACT_APP_BASE_URL}users`;

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

	// Add a submit handler to handle form submission

	const handleSubmit = (e) => {
		e.preventDefault();

		// Implement registration logic here.
		// You can send the form data to your backend API for registration.
		// Consider making an HTTP POST request to your registration endpoint.

		const formData = {
			name,
			email,
			password
		};
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
					toast.success('Register successfully !!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						});
				}
			})
			.catch(error => {
				console.log(error);
				toast.error('Register failed !!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			})

		// Reset the form fields after submission
		setName('');
		setEmail('');
		setPassword('');
		setPhoneNumber('');
		setAddress('');
	};

	// Inside the RegistrationForm component
	// return (
	// 	<div className="registration-container">
	// 		<h2>Registration</h2>
	// 		<h3 style={{ color: 'red' }}>{notification}</h3>
	// <form className="registration-form" onSubmit={handleSubmit}>
	// 	{/* Name */}
	// 	<div>
	// 		<label htmlFor="name">Name:</label>
	// 		<input
	// 			type="text"
	// 			id="name"
	// 			name="name"
	// 			value={name}
	// 			onChange={handleNameChange}
	// 			required
	// 		/>
	// 	</div>

	// 	{/* Email */}
	// 	<div>
	// 		<label htmlFor="email">Email:</label>
	// 		<input
	// 			type="email"
	// 			id="email"
	// 			name="email"
	// 			value={email}
	// 			onChange={handleEmailChange}
	// 			required
	// 		/>
	// 	</div>

	// 	{/* Password */}
	// 	<div>
	// 		<label htmlFor="password">Password:</label>
	// 		<input
	// 			type="password"
	// 			id="password"
	// 			name="password"
	// 			value={password}
	// 			onChange={handlePasswordChange}
	// 			required
	// 		/>
	// 	</div>

	// 	{/* Phone Number */}
	// 	<div>
	// 		<label htmlFor="phoneNumber">Phone Number:</label>
	// 		<input
	// 			type="tel"
	// 			id="phoneNumber"
	// 			name="phoneNumber"
	// 			value={phoneNumber}
	// 			onChange={handlePhoneNumberChange}
	// 			required
	// 		/>
	// 	</div>

	// 	{/* Address */}
	// 	<div>
	// 		<label htmlFor="address">Address:</label>
	// 		<textarea
	// 			id="address"
	// 			name="address"
	// 			value={address}
	// 			onChange={handleAddressChange}
	// 			required
	// 		/>
	// 	</div>

	// 	{/* Submit Button */}
	// 	<div>
	// 		<button type="submit">Register</button><br/>
	// 		<Link to='/login'>Already have account? Back to login</Link>
	// 	</div>
	// </form>
	// 	</div>
	// );

	return (
		<div className='p-10'>
			<div className='register-form'>
				<div className='register-wrap'>
					<div className='container p-0'>
						<div className='register'>
							Register
						</div>
						<div className='register-form'>
							<form className="register-form" onSubmit={handleSubmit}>
								{/* Name */}
								<div className='wrap-input'>
									<label htmlFor="name"></label>
									<input
										className='register-input'
										type="text"
										id="name"
										name="name"
										value={name}
										onChange={handleNameChange}
										required
										placeholder='Name'
									/>
								</div>

								{/* Email */}
								<div className='wrap-input'>
									<label htmlFor="email"></label>
									<input
										className='register-input'
										type="email"
										id="email"
										name="email"
										value={email}
										onChange={handleEmailChange}
										required
										placeholder='Email'
									/>
								</div>

								{/* Password */}
								<div className='wrap-input'>
									<label htmlFor="password"></label>
									<input
										className='register-input'
										type="password"
										id="password"
										name="password"
										value={password}
										onChange={handlePasswordChange}
										required
										placeholder='Password'
									/>
								</div>

								{/* Submit Button */}
								<div className='mt-3'>
									<button className='register-btn' type="submit">Register</button><br />
									<Link className='link-login' to='/login'>Already have account? Back to login</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer/>
		</div>
	)
}

export default Register;
