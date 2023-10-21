import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Home/home.css";
import avatar from "../../asset/O2.jpg";
import CONSTANT from "../../utils/Iconstant";
import socketIOClient from "socket.io-client";

const host = CONSTANT.host;

function Home({ user }) {
	const [isAdmin, setIsAdmin] = useState(false);
	const [userName, setUserName] = useState("");
	const [socket, setSocket] = useState(null);
	const [isAvailable, setIsAvailable] = useState(false);
	const nav = useNavigate();

	useEffect(() => {
		const newSocket = socketIOClient.connect(host);
		setSocket(newSocket);
		if (user && user.isAdmin){
			newSocket.emit("storeAdminId", user.email);
		}
		if(user.name){
			setUserName(user.name)
		}

		return () => {
			newSocket.disconnect();
		}
	}, []);

	useEffect(() => {
		if (socket) {

		}
	}, [socket]);

	useEffect(() => {
		if (user !== null) {
			setIsAdmin(user.isAdmin);
		}
	}, [user])

	const handleNameChange = (e) => {
		setUserName(e.target.value);
	};

	const goToChat = (e, path) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (userName.trim() !== "" || isAdmin) {
			// You can also pass the username and selected avatar to the chat route
			nav(path, { state: { userName } });
		} else {
			alert("Please enter your name.");
		}
	};

	return (
		<div className="container">
			<div className="row-auto">
				<div className="text-center">
					<h1>Pilyr online chat</h1>
					{!user.isAdmin ? <h3>You can chat with pylir as guest without login now</h3> : <></>}
				</div>
				{!isAdmin ? (
					<div className="login">
						<form onSubmit={(e) => goToChat(e, '/chat')}>
							<input
								type="text"
								className="name required:border-red-500 mt-4 text-lg min-w-full"
								placeholder="Enter your name..."
								value={userName}
								onChange={handleNameChange}
								required
							/>
							<hr />
							<div className="user-photos flex-col gap">
								<div className="col-span-12">
									<h3 className="text-center mt-4">Pick your avatar.</h3>
								</div>
								<div className="photo-gallery grid grid-cols-3 gap-4 p-5">
									{/* You can map through an array of avatars and generate the elements */}
									{Array.from({ length: 9 }).map((_, index) => (
										<div key={index} className="flex justify-center">
											<div className="flex justify-center w-auto">
												<img className="rounded-full" src={avatar} alt={`Avatar ${index + 1}`} />
											</div>
										</div>
									))}
								</div>
								<div className="row-span-6 p-3 flex justify-center">
									<button className="rounded-full bg-sky-500 w-auto" type="submit">
										Let's Chat
									</button>
								</div>
							</div>
						</form>
					</div>
				) : (
					<div>
						<p>Welcome to admin doashboard</p>
						<input type="button" onClick={(e) => goToChat(e, '/chat')} className="btn btn-success mr-3" value="Go to chat" />
						<input type="button" onClick={(e) => goToChat(e, '/listPending')} className="btn btn-warning mr-3" value="Go to pending" />
					</div>)}
			</div>
		</div>
	);
}

export default Home;