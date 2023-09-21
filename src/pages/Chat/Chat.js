import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const host = "http://localhost:3000";

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
		<div className="box-chat">
			<div className="box-chat_message">
				{renderMess}
			</div>

			<div className="send-box">
				<textarea
					value={message}
					onKeyDown={onEnterPerss}
					onChange={e => setMessage(e.target.value)}
					placeholder="Message..."
				/>
				<button onClick={sendMessage}>
					Send
				</button>
			</div>
		</div>
	);
}

export default Chat;