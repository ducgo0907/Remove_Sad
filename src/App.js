import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
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
import ListPending from './pages/ListPending/ListPending';
import socketIOClient from 'socket.io-client';
import PaymentForm from './pages/Order/Order';
import SuccessPage from './pages/Status/Success';
import FailPage from './pages/Status/Failed';
import Homepage from './pages/Homepage/Homepage';

function App() {
	const [user, setUser] = useState(authService.getCurrentUser());
	const [users, setUsers] = useState([]);
	const [socket, setSocket] = useState(null);
	const [money, setMoney] = useState(authService.getCurrentMoney() || 0)
	const [isFree, setisFree] = useState("true");

	useEffect(() => {
		if (localStorage.getItem("isFree") === null) {
			localStorage.setItem("isFree", true);
		}
	}, [])

	const logOut = () => {
		authService.logout();
		setUser(null);
		// window.location.reload();
		window.location.replace('/');
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

	useEffect(() => {
		if (user && user.email != undefined && user.email.includes("@")) {
			authService.getMoney()
				.then(res => {
					window.localStorage.setItem("money", res.data.money);
					setMoney(parseInt(res.data.money))
				})
				.catch(err => {
					console.log(err);
				})
		}
	}, [user])

	useEffect(() => {
		const newSocket = socketIOClient.connect(process.env.REACT_APP_BASE_URL);
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
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
	useEffect(() => {
		if (socket) {
			if (user && user.isAdmin) {
				socket.on('getListUserPending', res => {
					setUsers(res);
				})
			}
		}
	}, [socket])
	return (
		<Router basename='/'>
			<div className="App">
				<header className="relative">
					<nav className="navbar navbar-expand-lg navbar-light bg-light fixed top-0 left-0 right-0">
						<div className="container">
							<Link className="navbar-brand" to="/">Pilyr</Link>
							<div className='flex flex-row space-x-10'>
								<Link className="navbar-brand font-thin" to="/home">Home</Link>
								<Link className="navbar-brand font-thin" to="/about">About</Link>
								<Link className="navbar-brand font-thin" to="/">Service</Link>
								<div className='navbar-brand font-thin'>
									Bạn đang có {money ? money / 20000 : 0} cốc coffee
								</div>
								<Link to='/payment' className='font-semibold text-2xl	' style={{ textDecoration: "none", fontSize: "" }}>Nạp tiền</Link>
								{user && user.email != undefined && user.email.includes("@")
									? (<div className='narbar-brand logout-btn' onClick={() => logOut()}>Đăng xuất</div>)
									: (<Link className='navbar-brand' to="/login">Đăng nhập</Link>)}
								{/* <Link className="navbar-brand font-thin" to="/">Blog</Link>
								<Link className="navbar-brand font-thin" to="/">Contact</Link> */}
							</div>
						</div>
					</nav>
				</header>

				{/* <header>
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="container">
							<Link className="navbar-brand" to="/">Pilyr</Link>
							<div>
								Bạn đang có {money ? money / 20000 : 0} cốc coffee
							</div>
							<Link to='/payment' style={{ textDecoration: "none", fontSize: "1.25em" }}>Nạp tiền</Link>
							{user && user.email != undefined && user.email.includes("@")
								? (<div className='narbar-brand logout-btn' onClick={() => logOut()}>Đăng xuất</div>)
								: (<Link className='navbar-brand' to="/login">Đăng nhập</Link>)}
						</div>
					</nav>
				</header> */}
				<main>
					<Routes>
						<Route path="/" element={<Home user={user} />} />
						<Route path="/home" element={<Homepage />} />
						<Route path="/about" element={<About />} />
						<Route path='/payment' element={<PaymentForm user={user} />} />
						<Route path='/success' element={<SuccessPage />} />
						<Route path='/failed' element={<FailPage />} />
						<Route path="/login" element={<DirectRouter path="/" element={<Login />} />} />
						<Route path="/chat" element={<Chat userLogged={user} setSocket={setSocket} socket={socket} />} />
						<Route path='/register' element={<DirectRouter path="/" element={<Register />} />} />
						<Route path='/schedule' element={<Schedule user={user} />} />
						<Route path='/listPending' element={<ListPending users={users} socket={socket} setUsers={setUsers} user={user} />} />
					</Routes>
				</main>
				{/* <footer className="bg-dark text-light py-3">
					<div className="container text-center">
						&copy; {new Date().getFullYear()} Pilyr. All Rights Reserved.
					</div>
				</footer> */}
			</div>
		</Router>
	);
}

export default App;
