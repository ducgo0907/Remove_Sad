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
import Header from './components/Header';

function App() {
	const [token, setToken] = useState(localStorage.getItem('accessToken'));
	return (
		<Router basename='/Remove_Sad'>
			<div className="App">
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<DirectRouter path="/" element={<Login />} />} />
						<Route path="/chat" element={<PrivateRoute path="/login" element={<Chat />} />} />
						<Route path='/register' element={<DirectRouter path="/" element={<Register />} />} />
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
