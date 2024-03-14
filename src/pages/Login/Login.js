import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";
import authService from "../../services/auth.service";
import Header from "../../components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const host = `${process.env.REACT_APP_BASE_URL}users`;

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	localStorage.clear();

	const nav = useNavigate();

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
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
				toast.error('Login failed !!', {
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
	};

	// return (
	// 	<div className="login-container">
	// 		<h2>Login</h2>
	// <form className="login-form" onSubmit={handleSubmit}>
	// 	<div>
	// 		<label htmlFor="username">Email:</label>
	// 		<input
	// 			type="text"
	// 			id="username"
	// 			name="username"
	// 			value={username}
	// 			onChange={handleUsernameChange}
	// 			required
	// 		/>
	// 	</div>
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
	// 	<div>
	// 		<button type="submit">Login</button><br/>
	// 		<Link to='/register'>Don't have account ? Go to register</Link>
	// 	</div>
	// </form>
	// 	</div>
	// );

	return (
		<>
			{/* <Header /> */}
			<div className="p-10 login-container">
				<a className='bana-left' href="https://www.facebook.com/profile.php?id=100068469255789" target="_blank" rel="noreferrer">
					<img src='BanaCrochetLeft.jpg' alt='img' />
				</a>
				<div className="login-form">
					<div className="login-wrap">
						<div className="container p-0">
							<div className="signIn">
								Sign In
							</div>
							<div className="login-form">
								<form className="login-form" onSubmit={handleSubmit}>
									<div className="wrap-input">
										<label htmlFor="username"></label>
										<input
											className="login-input"
											type="text"
											id="username"
											name="username"
											value={username}
											onChange={handleUsernameChange}
											placeholder="Email"
											required
										/>
									</div>
									<div className="wrap-input">
										<label htmlFor="password"></label>
										<input
											className="login-input"
											type="password"
											id="password"
											name="password"
											value={password}
											onChange={handlePasswordChange}
											placeholder="Password"
											required
										/>
									</div>
									<div className="mt-3">
										<button className="login-btn" type="submit">Login</button><br />
										<Link className="link-register" to='/register'>Don't have account ? Go to register</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<a className='bana-right' href="https://www.facebook.com/profile.php?id=100068469255789" target="_blank" rel="noreferrer">
					<img src='BanaCrochetRight.jpg' alt='img' />
				</a>

			</div>
			<ToastContainer />
			<div className="login-adv">
				<a className='bana-center' href="https://www.facebook.com/profile.php?id=100068469255789" target="_blank" rel="noreferrer">
					<img src='BanaCrochet.jpg' alt='img' />
				</a>
			</div>
		</>
	)

}

export default Login;