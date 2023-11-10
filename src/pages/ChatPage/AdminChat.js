import ScrollToBottom from "react-scroll-to-bottom";
import TextNoti from "../TextNofitication/TextNoti";
import { v4 as uuidv4 } from "uuid";
import "../ChatPage/chat.css"

const AdminChat = ({
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
	sendMessage }) => {

	console.log(users);

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

export default AdminChat;