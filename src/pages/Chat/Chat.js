import React, { useEffect, useRef, useState } from "react";
import "../Chat/chat.css"
import { useLocation, useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import Header from "../../components/Header";

// const host = "https://s9fyy9-3001.csb.app";
// const host = "https://remove-sad.onrender.com";
import CONSTANT from "../../utils/Iconstant";
import messageService from "../../services/message.service";
import { v4 as uuidv4 } from "uuid";
import TextNoti from "../TextNofitication/TextNoti";
import AdminChat from "../ChatPage/AdminChat";
import UserChat from "../ChatPage/UserChat";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

// const host = "https://s9fyy9-3001.csb.app";
const host = CONSTANT.host;
const MySwal = withReactContent(Swal);

function Chat({ userLogged, setSocket, socket }) {
	const [message, setMessage] = useState('');
	const [mess, setMess] = useState([]);
	const [user, setUser] = useState(localStorage.getItem("pylirConnect"));
	const [users, setUsers] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isConnect, setIsConnect] = useState(false);
	const [avatar, setAvatar] = useState("/1.png");
	const nav = useNavigate();
	const location = useLocation();
	const socketRef = useRef();

	let userName = location?.state?.userName;

	// if (userInfo && userInfo !== null) {
	// 	let userInformation = JSON.parse(userInfo);
	// 	userName = userInformation.name; // change email => name
	// }

	useEffect(() => {
		const isAccess = localStorage.getItem("isAccess");
		if (!isAccess || isAccess == undefined) {
			nav('/')
		}
		const newAvatar = localStorage.getItem("avatar");
		if (newAvatar && newAvatar != undefined) {
			setAvatar(newAvatar);
		}
	}, [])

	useEffect(() => {
		socketRef.current = socketIOClient.connect(host);
		if (userLogged && userLogged !== null) {
			setIsAdmin(userLogged.isAdmin);
			if (userLogged.isAdmin) {
				messageService.getListUser(userLogged.email)
					.then(res => {
						const list = res.data.data;
						setUsers(list);
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
			if (users.length > 0) {
				const updatedUsers = users.filter(user => {
					return user.sender !== dataGot.sender
				});
				const newList = [{ sender: dataGot.sender }, ...updatedUsers]
				console.log(newList, dataGot);
				// Add dataGot.sender to the beginning of the updated users array
				setUsers(newList);
			} else {
				messageService.getListUser(userLogged.email)
					.then(res => {
						const list = res.data.data;
						setUsers(list);
					})
					.catch(err => {
						console.log(err);
					})
			}
			if (dataGot.sender !== 'admin') {
				setUser(dataGot.sender);
			}
		})

		socketRef.current.on("getAdminId", admin => {
			localStorage.setItem("pylirConnect", admin);
			setUser(admin);
			setIsConnect(true);
			MySwal.fire("Pylir is connected with you. Have fun ^^!");
		})

		if (user && user !== "") {
			// setIsConnect(true);
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
		if (message !== null && message !== "") {
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
				// console.log("Day la chat", admin);
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
					sendMessage={sendMessage}
					avatar={avatar}
				/>
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
					sendMessage={sendMessage}
					setMess={setMess}
					avatar={avatar}
				/>
			}
			{!userLogged.isVipMember && <div className='advertis'>
				<a className='nonfat' href="https://www.facebook.com/profile.php?id=61555888590527" target="_blank" rel="noreferrer">
					<img src='nonFatBakery.png' alt='img' />
				</a>
				<a className='wonder' href="https://www.facebook.com/Wonderlandstoreexe" target="_blank" rel="noreferrer">
					<img src='wonderlandStore.png' alt='img' />
				</a>
				<a className='owl' href="https://www.facebook.com/profile.php?id=61555679864702" target="_blank" rel="noreferrer">
					<img src='owlBeauty.png' alt='img' />
				</a>
			</div>
			}
		</div>
	);
}

export default Chat;