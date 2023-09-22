import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import "../Chat/chat.css"

const host = "https://copper-tadpole-gear.cyclic.cloud/";

function Chat() {
	const [message, setMessage] = useState('');
	const [mess, setMess] = useState([]);
	const [id, setId] = useState();

	const socketRef = useRef();

	useEffect(() => {
		socketRef.current = socketIOClient.connect(host);

		socketRef.current.on('getId', data => {
			setId(data);
		})

		socketRef.current.on('sendDataSever', dataGot => {
			console.log(dataGot);
			setMess(oldMsg => [...oldMsg, dataGot.data]);
		})
		return () => {
			socketRef.current.disconnect();
		}
	}, [])

	const sendMessage = () => {
		if (message !== null) {
			const msg = {
				content: message,
				id: id
			}
			socketRef.current.emit('sendDataClient', msg);
			setMessage('');
		}
	}

	const onEnterPerss = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			sendMessage();
		}
	}

	const renderMess = mess.map((m, index) =>
		<div
			key={index}
			className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}
		>
			{m.content}
		</div>
	)
	return (
		// <div className="box-chat">
		// 	<div className="box-chat_message">
		// 		{renderMess}
		// 	</div>

		// 	<div className="send-box">
		// 		<textarea
		// 			value={message}
		// 			onKeyDown={onEnterPerss}
		// 			onChange={e => setMessage(e.target.value)}
		// 			placeholder="Message..."
		// 		/>
		// 		<button onClick={sendMessage}>
		// 			Send
		// 		</button>
		// 	</div>
		// </div>

		<div className="flex justify-center w-full">
			<section class="msger w-full h-full">
				<header class="msger-header">
					<div class="msger-header-title">
						<i class="fas fa-comment-alt"></i> Pilyr Chat
					</div>
					<div class="msger-header-options">
						<span><i class="fas fa-cog"></i></span>
					</div>
				</header>

				<main class="msger-chat">
					<div class="msg left-msg">
						<div
							class="msg-img"
							style={{backgroundImage: "url(https://ih1.redbubble.net/image.2610089591.4691/pp,504x498-pad,600x600,f8f8f8.jpg)"}}
						></div>

						<div class="msg-bubble">
							<div class="msg-info">
								<div class="msg-info-name">Pilyr</div>
								<div class="msg-info-time">12:45</div>
							</div>

							<div class="msg-text text-left">
								Hi, welcome to PilyrChat! Go ahead and send me a message. 😄
							</div>
						</div>
					</div>

					<div class="msg right-msg">
						<div
							class="msg-img"
						></div>

						<div class="msg-bubble">
							<div class="msg-info">
								<div class="msg-info-name">Tuna</div>
								<div class="msg-info-time">12:46</div>
							</div>

							<div class="msg-text">
							Is an orange called an orange because it looks like orange or is orange called orange because it looks like an orange?
							</div>
						</div>
					</div>
				</main>

				<form class="msger-inputarea">
					<input type="text" class="msger-input" placeholder="Enter your message..."/>
						<button type="submit" class="msger-send-btn">Send</button>
				</form>
			</section>
		</div>
	);
}

export default Chat;