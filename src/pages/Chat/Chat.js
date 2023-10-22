import React, { useEffect, useRef, useState } from "react";
import "../Chat/chat.css"
import { useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import CONSTANT from "../../utils/Iconstant";
import messageService from "../../services/message.service";
import { v4 as uuidv4 } from "uuid";
import TextNoti from "../TextNofitication/TextNoti";
import AdminChat from "../ChatPage/AdminChat";
import UserChat from "../ChatPage/UserChat";

// const host = "https://s9fyy9-3001.csb.app";
const host = CONSTANT.host;

function Chat({ userLogged, setSocket, socket }) {
	const [message, setMessage] = useState('');
	const [mess, setMess] = useState([]);
	const [user, setUser] = useState(localStorage.getItem("pylirConnect"));
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
			localStorage.setItem("pylirConnect", admin);
			setUser(admin);
			setIsConnect(true);
			alert("Pylir is connected with you. Have fun ^^!");
		})
		
		if(user && user !== ""){
			setIsConnect(true);
		}

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
		<div>
			{isAdmin ?
				<AdminChat
					userLogged={userLogged}
					isConnect={isConnect}
					userName={userName}
					isAdmin={isAdmin}
					users={users}
					user={user}
					mess={mess}
					setUser={setUser}
					message={message}
					onEnterPerss={onEnterPerss}
					setMessage={setMessage}
					sendMessage={sendMessage} />
				:
				<UserChat
					userLogged={userLogged}
					isConnect={isConnect}
					userName={userName}
					isAdmin={isAdmin}
					users={users}
					user={user}
					mess={mess}
					setUser={setUser}
					message={message}
					onEnterPerss={onEnterPerss}
					setMessage={setMessage}
					sendMessage={sendMessage} />
			}

		</div>
	);
}

export default Chat;