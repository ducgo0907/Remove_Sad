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
import { Chart } from './pages/Chart/Chart';
import Guideline from './pages/Guideline/Guideline';
import ServiceChoice from './pages/ServiceChoice/ServiceChoice';
import Meet from './pages/Meet/Meet';
import ListPendingMeeting from './pages/ListPending/ListPendingMeeting';

function App() {
	const [user, setUser] = useState(authService.getCurrentUser());
	const [users, setUsers] = useState([]);
	const [socket, setSocket] = useState(null);
	const [money, setMoney] = useState(authService.getCurrentMoney() || 0)
	const [isFree, setisFree] = useState("true");
	const [meeting, setMeeting] = useState(0);

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
			email: "Khách-" + makeid(10),
			id: makeid(20),
			isAdmin: false,
			accessToken: ""
		}
		authService.genGuest()
			.then(res => {
				guestUser.email = res.data;
				localStorage.setItem("user", JSON.stringify(guestUser));
				setUser(guestUser);
			})
			.catch(err => {
				console.log(err)
			})
		
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
					const money = res.data.money.money;
					const item = res.data.money.item;
					window.localStorage.setItem("money", money);
					setMoney(parseInt(money))
					if(item){
						setMeeting(item.amount);
					}
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
						<div className="container ">
							<Link className="navbar-brand" to="/"><img className='w-24' src='pilyr-logo.png'/></Link>
							<div className='flex flex-row space-x-10'>
								<Link className="navbar-brand font-thin" to="/">Trang Chủ</Link>
								<Link className="navbar-brand font-thin" to="/about">Giới Thiệu</Link>
								<Link className="navbar-brand font-thin" to="/guideline">Hướng dẫn</Link>
								<Link className="navbar-brand font-thin" to="/choice">Dịch Vụ</Link>
								<div className='navbar-brand font-thin' style={{wordBreak: 'break-word'}}>
									Bạn đang có {money ? money / 20000 : 0} coffe, {meeting} coffe trò chuyện
								</div>
								<Link to='/payment' className='font-semibold text-xl	' style={{ textDecoration: "none", fontSize: "" , padding: "5px 0px"}}>Nạp tiền</Link>
								{user && user.email != undefined && user.email.includes("@")
									? (<div className='narbar-brand logout-btn font-thin text-xl justify-center' style={{alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "center"}} onClick={() => logOut()}>Đăng xuất</div>)
									: (<Link className='navbar-brand font-thin' to="/login">Đăng nhập</Link>)}
								{/* <Link className="navbar-brand font-thin" to="/">Blog</Link>
								<Link className="navbar-brand font-thin" to="/">Contact</Link> */}
							</div>
						</div>
					</nav>
				</header>
				<main>
					<Routes>
						<Route path="/home" element={<Home user={user} />} />
						<Route path="/" element={<Homepage />} />
						{/* <Route path="/home" element={<Homepage />} /> */}
						<Route path="/about" element={<About />} />
						<Route path="/guideline" element={<Guideline />} />
						<Route path='/payment' element={<PaymentForm user={user} />} />
						<Route path='/success' element={<SuccessPage />} />
						<Route path='/failed' element={<FailPage />} />
						<Route path="/login" element={<DirectRouter path="/" element={<Login />} />} />
						<Route path="/chat" element={<Chat userLogged={user} setSocket={setSocket} socket={socket} />} />
						<Route path='/register' element={<DirectRouter path="/" element={<Register />} />} />
						<Route path='/schedule' element={<Schedule user={user} />} />
						<Route path='/listPending' element={<ListPending users={users} socket={socket} setUsers={setUsers} user={user} />} />
						<Route path='/dashboard' element={<Chart />} />
						<Route path='/choice' element={<ServiceChoice user={user} />} />
						<Route path='/meet' element={<Meet user={user} />} />
						<Route path='/pending-meeting' element={<ListPendingMeeting />} />
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
