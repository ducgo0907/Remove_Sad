import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Home/home.css";
import CONSTANT from "../../utils/Iconstant";
import socketIOClient from "socket.io-client";
import authService from "../../services/auth.service";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const host = CONSTANT.host;
const MySwal = withReactContent(Swal);

function Home({ user }) {
	const [isAdmin, setIsAdmin] = useState(false);
	const [userName, setUserName] = useState("");
	const [socket, setSocket] = useState(null);
	const [isFree, setIsFree] = useState(localStorage.getItem("isFree") === "true");
	const [currentAvatar, setCurrentAvatar] = useState("");
	const nav = useNavigate();
	const imageArrays = [
		"/1.png",
		"/2.png",
		"/3.png",
		"/4.png",
		"/5.png",
		"/6.png",
		"/7.png",
		"/8.png",
		"/9.png",
	]
	useEffect(() => {
		const newSocket = socketIOClient.connect(host);
		setSocket(newSocket);
		if (user && user.isAdmin) {
			newSocket.emit("storeAdminId", user.email);
		}
		if (user && user.name != null) {
			setUserName(user.name)
		} else {
			setUserName("");
		}

		if (localStorage.getItem("isFree") === null) {
			setIsFree(true);
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

	useEffect(() => {
		if(currentAvatar){
			localStorage.setItem("avatar", currentAvatar);
		}
	})

	const handleNameChange = (e) => {
		setUserName(e.target.value);
	};
	const goToChat = (e, path) => {
		e.preventDefault(); // Prevent the default form submission behavior

		const title = isFree
			? "Bạn có muốn sử dụng 20 phút dùng thử miễn phí?"
			: "Bạn có muốn sử dụng một cốc cà phê để trò chuyện với Pilyr?";
		if (!isAdmin) {
			if (userName.trim() !== "" || isAdmin) {
				authService.checkExistedChat({ email: user.email })
					.then(res => {
						const data = res.data;
						localStorage.setItem("isFree", false)
						setIsFree(false);
						if (data.status === 0) {
							MySwal.fire({
								title: "Chat cùng Pilyr",
								text: title,
								icon: 'info',
								confirmButtonText: "Đồng ý",
								cancelButtonText: "Quay lại",
								cancelButtonColor: "red",
								showCancelButton: true,
								customClass: {
									confirmButton: 'col-6',
									cancelButton: 'col-6'
								}
							})
								.then((response) => {
									if (response.isConfirmed) {
										authService.goToChat({ isFree, email: user.email })
											.then(response => {
												const data = response.data;
												if (data.status === 0) {
													Swal.fire("Bạn không có đủ tiền mua cà phê");
													localStorage.setItem("isAccess", false);
												} else {
													const twentyMinutesFromNow = new Date();
													const startDate = new Date(data.timeStart);
													startDate.setMinutes(startDate.getMinutes() + 20);
													const remainingMilliseconds = Math.floor((startDate - twentyMinutesFromNow) / 1000);
													localStorage.setItem("remainTime", remainingMilliseconds);
													localStorage.setItem("isAccess", true);
													nav(path, { state: { userName } })
												}
											})
											.catch(error => {

											})
									}
								})
						} else {
							const twentyMinutesFromNow = new Date();
							const startDate = new Date(data.timeStart);
							startDate.setMinutes(startDate.getMinutes() + 20);
							if (startDate > twentyMinutesFromNow) {
								const remainingMilliseconds = Math.floor((startDate - twentyMinutesFromNow) / 1000);
								localStorage.setItem("remainTime", remainingMilliseconds);
								localStorage.setItem("isAccess", true);
								nav(path, { state: { userName } });
							}
						}
					})
					.catch(err => {
						Swal.fire("Lỗi hệ thống, vui lòng thử lại sau");
						console.log(err);
					})
			} else {
				Swal.fire("Vui lòng điền tên của bạn");
			}
		} else {
			nav(path, { state: { userName } });
			localStorage.setItem("isAccess", true)
		}
	};

	return (
		<div className="container">
			<div className="row-auto">
				<div className="text-center">
					<h1>Pilyr online chat</h1>
					{!user || !user.isAdmin ? <h3>Bạn có thể trò chuyện với Pylir như là khách ngay bây giờ</h3> : <></>}
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
									<h3 className="text-center mt-4">Chọn cho mình một avatar nào.</h3>
								</div>
								<div className="photo-gallery grid grid-cols-3 gap-4 p-5">
									{/* You can map through an array of avatars and generate the elements */}
									{imageArrays.map((avatar, index) => (
										<div key={index} style={{ backgroundColor: currentAvatar == avatar ? 'rgb(217 244 248)' : ''}} className="flex justify-center" onClick={() => setCurrentAvatar(avatar)}>
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
						<p>Chào mừng tới admin dashboard</p>
						<input type="button" onClick={(e) => goToChat(e, '/chat')} className="btn btn-success mr-3" value="Go to chat" />
						<input type="button" onClick={(e) => goToChat(e, '/listPending')} className="btn btn-warning mr-3" value="Go to pending" />
					</div>)}
			</div>
		</div>
	);
}

export default Home;