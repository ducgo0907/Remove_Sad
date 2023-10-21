import React, { useEffect, useRef, useState } from "react";
import "../Chat/chat.css"
import { useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import CONSTANT from "../../utils/Iconstant";
import messageService from "../../services/message.service";
import { v4 as uuidv4 } from "uuid";
import TextNoti from "../TextNofitication/TextNoti";

// const host = "https://s9fyy9-3001.csb.app";
const host = CONSTANT.host;

function Chat({ userLogged, setSocket, socket }) {
	const [message, setMessage] = useState('');
	const [mess, setMess] = useState([]);
	const [user, setUser] = useState("");
	const [users, setUsers] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isConnect, setIsConnect] = useState(false);
	const location = useLocation();
	const socketRef = useRef();

	let userName = location.state.userName;

	// if (userInfo && userInfo !== null) {
	// 	let userInformation = JSON.parse(userInfo);
	// 	userName = userInformation.name; // change email => name
	// }

	useEffect(() => {
		socketRef.current = socketIOClient.connect(host);
		if (userLogged && userLogged !== null) {
			setIsAdmin(userLogged.isAdmin);
			if (userLogged.isAdmin) {
				messageService.getListUser(userLogged.email)
					.then(res => {
						setUsers(res.data.data);
					})
					.catch(err => {
						console.log(err);
					})
			}
		}

		messageService.getListPilyr()
			.then(res => {
				if (res.status === 200) {
					setUser(res.data.data.email);
				}
			})
			.catch(err => console.log(err))

		socketRef.current.emit('storeUserId', { userId: userLogged.email, isAdmin: userLogged.isAdmin, username: userName });

		// Fetch connected users from the server
		socketRef.current.emit('getConnectedUsers');

		socketRef.current.on('privateMessage', dataGot => {
			setMess(oldMsg => [...oldMsg, dataGot]);

			// Remove dataGot.sender from the current users array (if it exists)
			const updatedUsers = users.filter(user => user.sender !== dataGot.sender);
			// Add dataGot.sender to the beginning of the updated users array
			setUsers([{ sender: dataGot.sender }, ...updatedUsers]);
			if (dataGot.sender !== 'admin') {
				setUser(dataGot.sender);
			}
		})

		socketRef.current.on("getAdminId", admin => {
			setUser(admin);
			setIsConnect(true);
		})


		return () => {
			socketRef.current.disconnect();
		}
	}, [])

	useEffect(() => {
		setMess([]);
		if (userLogged !== "" && user !== "") {
			messageService.getAllMessage({ receiver: userLogged.email, sender: user })
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
				sender: userLogged.email,
				receiver: user,
				fakeName: location.state.userName,
				isAdmin: userLogged.isAdmin
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

	useEffect(() => {
		if (socket) {
			socket.on("getAdminId", (admin) => {
				console.log("Day la chat", admin);
			})
		}
	}, [socket])
	return (
		<div className="flex justify-center w-full">
			{!userLogged.isAdmin && !isConnect && <TextNoti text={"watiting ...."} />}
			<div>
				<h2>Hello {userName} {isAdmin && ', these are your list customer: '}</h2>
				<ul className="user-list"> {/* Apply the user-list class */}
					{users.map((userDetail) => userDetail.sender !== userLogged.email && isAdmin ? (
						<li key={userDetail.sender} onClick={() => setUser(userDetail.sender)} className={userDetail.sender === user ? "isSelected user-item" : "user-item"}> {/* Apply the user-item class */}
							<span className="user-name">{userDetail.sender}</span> {/* Apply the user-name class */}
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
							return message.isAdmin ?
								(
									<div className="msg left-msg" key={uuidv4()}>
										<div
											className="msg-img"
											style={{ backgroundImage: "url(https://ih1.redbubble.net/image.2610089591.4691/pp,504x498-pad,600x600,f8f8f8.jpg)" }}
										></div>

										<div className="msg-bubble">
											<div className="msg-info">
												<div className="msg-info-name">Pilyr</div>
												<div className="msg-info-time">{message.createdAt} {message.isAdmin}</div>
											</div>

											<div className="msg-text text-left">
												{message.message}
											</div>
										</div>
									</div>
								) :
								(
									<div className="msg right-msg" key={uuidv4()}>
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
	);
}

export default Chat;