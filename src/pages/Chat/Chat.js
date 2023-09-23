import React, { useEffect, useRef, useState } from "react";
import "../Chat/chat.css"
import { useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

const host = "http://localhost:3001";

function Chat() {
	const [message, setMessage] = useState('');
	const [mess, setMess] = useState([{ sender: 'admin', message: 'Hi, welcome to PilyrChat! Go ahead and send me a message. 😄' }]);
	const [user, setUser] = useState("admin");
	const [users, setUsers] = useState([]);
	const location = useLocation();
	const socketRef = useRef();

	const userName = location.state.userName;

	useEffect(() => {
		socketRef.current = socketIOClient.connect(host);

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

			// Add dataGot.sender to the beginning of the updated users array
			setUsers([dataGot.sender, ...updatedUsers]);

			if(dataGot.sender !== 'admin'){
				setUser(dataGot.sender);
			}
		})

		return () => {
			socketRef.current.disconnect();
		}
	}, [])

	useEffect(() => {
		setMess([]);
		if (userName != "" && user != "") {
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
				});
		}
	}, [user])

	const sendMessage = async () => {
		if (message !== null) {
			const msg = {
				message: message,
				sender: userName,
				receiver: user
			}
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
		<div className="flex justify-center w-full">
			<div>
				<h2>Hello {userName} {userName === 'admin' && ', these are your connected friends'}</h2>
				<ul className="user-list"> {/* Apply the user-list class */}
					{users.map((userDetail) => userDetail !== userName && userName === 'admin' ? (
						<li key={userDetail} onClick={() => setUser(userDetail)} className={userDetail === user ? "isSelected user-item" : "user-item"}> {/* Apply the user-item class */}
							{/* Add user avatar and username here */}
							<span className="user-name">{userDetail}</span> {/* Apply the user-name class */}
						</li>
					) : (<></>))}
				</ul>
			</div>
			<section className="msger w-full h-full">
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
							return message.sender === 'admin' ?
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
												<div className="msg-info-name">{message.sender}</div>
												<div className="msg-info-time">{message.createdAt}</div>
											</div>

											<div className="msg-text">
												{message.message}
											</div>
										</div>
									</div>
								)
						})}
					</ScrollToBottom>
				</main>
				<input type="text" className="msger-input"
					placeholder="Enter your message..."
					value={message}
					onKeyDown={onEnterPerss}
					onChange={e => setMessage(e.target.value)} />
				<button type="submit" className="msger-send-btn" onClick={sendMessage} >Send</button>
			</section>
		</div>
	);
}

export default Chat;