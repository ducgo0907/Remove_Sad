import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Chat from './pages/Chat/Chat';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DirectRouter from './components/DirectRouter';
import authService from './services/auth.service';
import 'react-datepicker/dist/react-datepicker.module.css'
import Schedule from './pages/Schedule/Schedule';

function App() {
	const [user, setUser] = useState(authService.getCurrentUser());

	const logOut = () => {
		authService.logout();
		setUser(null);
		window.location.reload();
	}
	// const [token, setToken] = useState(localStorage.getItem('accessToken'));

	const genGuestAccount = () => {
		const guestUser = {
			email: "guest" + makeid(50),
			id: makeid(20),
			isAdmin: false,
			accessToken: ""
		}
		localStorage.setItem("user", JSON.stringify(guestUser));
		setUser(guestUser);
	}

	useEffect(() => {
		if (!user && user == undefined && user == null) {
			genGuestAccount();
		}
	}, [])

	function makeid(length) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}

	return (
		<Router basename='/Remove_Sad'>
			<div className="App">
				<header>
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="container">
							<Link className="navbar-brand" to="/">Pilyr</Link>
							{user && user.email.includes("@")
								? (<div className='narbar-brand logout-btn' onClick={() => logOut()}>Logout</div>)
								: (<Link className='navbar-brand' to="/login">Login</Link>)}
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							{/* {token && <div>
								<a href='/Remove_Sad' className='flex-wrap'><button onClick={() =>handleLogOut()}>Logout</button></a>
							</div>} */}
						</div>
					</nav>
				</header>
				<main>
					<Routes>
						<Route path="/" element={<Home user={user} />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<DirectRouter path="/" element={<Login />} />} />
						{/* <Route path="/chat" element={<PrivateRoute path="/login" element={<Chat userLogged={user} />} />} /> */}
						<Route path="/chat" element={<Chat userLogged={user} />} />
						<Route path='/register' element={<DirectRouter path="/" element={<Register />} />} />
						<Route path='/schedule' element={<Schedule user={user} />} />
					</Routes>
				</main>
				<footer className="bg-dark text-light py-3">
					<div className="container text-center">
						&copy; {new Date().getFullYear()} Pilyr. All Rights Reserved.
					</div>
				</footer>
			</div>
		</Router>
	);
}

export default App;
