import React, { useEffect, useRef, useState } from "react";
import "../Chat/chat.css"
import { useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import Header from "../../components/Header";

const host = "https://s9fyy9-3001.csb.app";
// const host = "https://remove-sad.onrender.com";

function Chat() {
	const [message, setMessage] = useState('');
	const [mess, setMess] = useState([]);
	const [user, setUser] = useState("trungnqhe161514@fpt.edu.vn");
	const [users, setUsers] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const location = useLocation();
	const socketRef = useRef();

	const accessToken = localStorage.getItem('accessToken');
	let userInfo = localStorage.getItem('userInfo');

	let userName = location.state.userName;
	if (userInfo && userInfo !== null) {
		let userInformation = JSON.parse(userInfo);
		userName = userInformation.name; // change email => name
	}

	useEffect(() => {
		socketRef.current = socketIOClient.connect(host);

		if (userInfo && userInfo !== null) {
			let userInformation = JSON.parse(userInfo);
			userName = userInformation.email;
			setIsAdmin(userInformation.isAdmin);
		}

		socketRef.current.emit('storeUserId', userName);

		// Fetch connected users from the server
		socketRef.current.emit('getConnectedUsers');

		// Listen for the list of connected users from the server
		socketRef.current.on('connectedUsers', (userList) => {
			setUsers(userList);
		});

		socketRef.current.on('privateMessage', dataGot => {
			// Het chatGPT, here is my question: I want to check users have include dataGot.sender or not. If not, I need setUsers add dataGot.sender
			setMess(oldMsg => [...oldMsg, dataGot]);

			// Remove dataGot.sender from the current users array (if it exists)
			const updatedUsers = users.filter(user => user !== dataGot.sender);
			console.log(dataGot);
			// Add dataGot.sender to the beginning of the updated users array
			setUsers([dataGot.sender, ...updatedUsers]);

			if (dataGot.sender !== 'admin') {
				setUser(dataGot.sender);
			}
		})

		return () => {
			socketRef.current.disconnect();
		}
	}, [])

	useEffect(() => {
		setMess([]);
		if (userName !== "" && user !== "") {
			const params = JSON.stringify({
				sender: userName,
				receiver: user
			})
			axios({
				method: 'get',
				url: `${host}/messages/all`,
				params: {
					sender: userName,
					receiver: user
				},
			})
				.then(function (response) {
					const listMessage = response.data.data;
					listMessage.forEach(element => {
						const date = new Date(element.createdAt);
						const hours = date.getHours();
						const minutes = date.getMinutes();
						const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
						const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
						element.createdAt = `${formattedHours}:${formattedMinutes}`
					});
					setMess(listMessage);
				})
				.catch(function (error) {
					console.log(error);
				})
		}
	}, [user])

	const sendMessage = async () => {
		if (message !== null) {
			const msg = {
				message: message,
				sender: userName,
				receiver: user,
				fakeName: location.state.userName
			}
			console.log(msg, "1");
			await socketRef.current.emit('privateMessage', msg);
			setMess(oldMsg => [...oldMsg, msg]);
			setMessage('');
		}
	}

	const onEnterPerss = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			sendMessage();
		}
	}

	return (
		<>
			<Header />
			<div className="flex justify-center w-full chat-container">
				<div className="text-left">
					<h2>Hello {userName} {isAdmin && ', these are your connected friends'}</h2>
					<ul className="user-list"> {/* Apply the user-list class */}
						{users.map((userDetail) => userDetail !== userName && isAdmin ? (
							<li key={userDetail} onClick={() => setUser(userDetail)} className={userDetail === user ? "isSelected user-item" : "user-item"}> {/* Apply the user-item class */}
								{/* Add user avatar and username here */}
								<span className="user-name">{userDetail}</span> {/* Apply the user-name class */}
							</li>
						) : (<></>))}
					</ul>
				</div>
				<section className="msger w-full">
					<header className="msger-header">
						<div className="msger-header-title">
							<i className="fas fa-comment-alt"></i> Pilyr Chat
						</div>
						<div className="msger-header-options">
							<span><i className="fas fa-cog"></i></span>
						</div>
					</header>

					<main className="msger-chat">
						<ScrollToBottom className="message-container">
							{mess.map(message => {
								// return message.sender === 'trungnqhe161514@fpt.edu.vn' ?
								return message.sender === 'Admin' ?
									(
										<div className="msg left-msg">
											<div
												className="msg-img"
												style={{ backgroundImage: "url(https://ih1.redbubble.net/image.2610089591.4691/pp,504x498-pad,600x600,f8f8f8.jpg)" }}
											></div>

											<div className="msg-bubble">
												<div className="msg-info">
													<div className="msg-info-name">Pilyr</div>
													<div className="msg-info-time">{message.createdAt}</div>
												</div>

												<div className="msg-text text-left">
													{message.message}
												</div>
											</div>
										</div>
									) :
									(
										<div className="msg right-msg">
											<div
												className="msg-img"
											></div>

											<div className="msg-bubble">
												<div className="msg-info">
													<div className="msg-info-name">{message.fakeName}</div>
													<div className="msg-info-time">{message.createdAt}</div>
												</div>

												<div className="msg-text whitespace-pre-wrap">
													{message.message}
												</div>
											</div>
										</div>
									)
							})}
						</ScrollToBottom>
					</main>
					<div className="send-msg">
						<input type="text" className="msger-input"
							placeholder="Enter your message..."
							value={message}
							onKeyDown={onEnterPerss}
							onChange={e => setMessage(e.target.value)} />
						<button type="submit" className="msger-send-btn m-0" onClick={sendMessage} >Send</button>
					</div>
				</section>
			</div>
		</>
	);
}

export default Chat;