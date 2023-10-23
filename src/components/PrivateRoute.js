import React from 'react';
import { Navigate } from 'react-router-dom';


let isAuthenticated = false;
function PrivateRoute({ element, path, ...rest }) {
	const user = localStorage.getItem('user');
	if (user !== null) {
		const userParse = JSON.parse(user);
		if (userParse.email.includes("@"))
			isAuthenticated = true;
	}
	return isAuthenticated ? (
		element
	) : (
		<Navigate to={path} replace={true} state={{ from: rest.location }} />
	);
}

export default PrivateRoute;