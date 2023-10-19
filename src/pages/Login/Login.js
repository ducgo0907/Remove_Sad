import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";
import authService from "../../services/auth.service";

// const host = 'https://s9fyy9-3001.csb.app/users'

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const nav = useNavigate();

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Here, you can implement your authentication logic.
		// Check if the username and password are valid.
		// If valid, you can redirect the user or perform other actions.
		const loginForm = {
			email: username,
			password: password
		}
		authService.login(loginForm)
			.then(function (response) {
				window.location.reload();
				nav("/");
			})
			.catch(function (error) {
				console.log(error);
			})
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form className="login-form" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Email:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={handleUsernameChange}
						required
					/>
				</div>
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
				<div>
					<button type="submit">Login</button><br />
					<Link to='/register'>Don't have account ? Go to register</Link>
				</div>
			</form>
		</div>
	);
}

export default Login;