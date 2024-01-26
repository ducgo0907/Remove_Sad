import ScrollToBottom, { useScrollTo } from "react-scroll-to-bottom";
import TextNoti from "../TextNofitication/TextNoti";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from "uuid";
import TicTacToe from "../Game/TicTacToe";
import "../ChatPage/chat.css"
import messageService from "../../services/message.service";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";

const UserChat = ({
	userLogged,
	isConnect,
	userName,
	isAdmin,
	users,
	user,
	mess,
	setUser,
	message,
	onEnterPerss,
	setMessage,
	sendMessage,
	setMess,
	avatar }) => {
	const [time, setTime] = useState(() => {
		const timeR = localStorage.getItem("remainTime");
		if(timeR){
			return timeR;
		}else{
			return 20*60;
		}
	})

	useEffect(() => {
		
	}, [])

	const handleDeleteChat = async () => {
		if (!window.confirm("Are you want to delete this chat?")) {
			return;
		}
		await messageService.deleteMessage(userLogged.email)
			.then(res => {
				setMess([])
				toast.success('Delete successfully !!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					});
			})
			.catch(err => {
				alert("Have errors")
				console.log(err);
				toast.error('Delete failed !!', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			})
	}

	return (
		<div div className="row justify-content-center">
			<div className="col-sm-12 justify-content-center">
			</div>
			<div className="col-sm-3">
				<TicTacToe />
			</div>
			<div className="col-sm-5 justify-content-center">
				<div>
					<h2>Hello {userName} {isAdmin && ', these are your list customer: '}</h2>
				</div>
				<section className="msger w-full">
					<header className="msger-header">
						<div className="msger-header-title">
							<i className="fas fa-comment-alt text-left">Pilyr Chat</i>
							<span><Timer initialTimeInSeconds={time} isStart={isConnect}/></span>
							<button className="btn-delete" onClick={handleDeleteChat}>Delete Chat</button>
						</div>
						<div className="msger-header-options">
							<span><i className="fas fa-cog"></i></span>
						</div>
					</header>

					<main className="msger-chat">
						<ScrollToBottom className="message-container">
							{mess.slice(-4).map((message, index) => {
								return message.isAdmin ?
									(
										<div className="msg left-msg" key={uuidv4()}>
											<div
												className="msg-img"
												style={{ backgroundImage: "url(/mascot.jpg)" }}
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
												style={{ backgroundImage: `url(${avatar})`}}
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
			<div className="col-sm-4">
				<h1 className="col-sm-12">Full history chat</h1>
				<div className="msger-chat msger-chat-2">
					<ScrollToBottom className="message-container">
						{mess.map(message => {
							return message.isAdmin ?
								(
									<div className="msg left-msg" key={uuidv4()}>
										<div
											className="msg-img"
											style={{ backgroundImage: "url(/mascot.jpg)" }}
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
											style={{ backgroundImage: `url(${avatar})`}}
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
				</div>
			</div>
			<ToastContainer/>
		</div>
	);
}

export default UserChat;