import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './ListPending.css'
import { useNavigate } from 'react-router-dom';

function ListPending({ users, setUsers, socket, user }) {
	const nav = useNavigate();
	console.log(users);

	const handleApprove = (email) => {
		socket.emit("connectedWithUser", { admin: user.email, user: email });
		nav('/chat', { state: { userName: "Pylir" } });
	}

	const handleReject = () => {

	}

	useEffect(() => {
		if (socket) {
			if (user.isAdmin) {
				socket.emit('getListUserPendingInit', "hi");
				socket.on('getListUserPending', res => {
					setUsers(res);
				})
			}
		}
	}, [socket])
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user.email}>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>
							<button
								className="btn btn-success btn-pending"
								onClick={() => handleApprove(user.email)}
							>
								Approve
							</button>
							<button
								className="btn btn-danger btn-pending"
								onClick={() => handleReject(user.email)}
							>
								Reject
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default ListPending;
