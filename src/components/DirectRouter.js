import React from 'react';
import { Navigate } from 'react-router-dom';


let isAuthenticated = false;
function DirectRouter({ element, path, ...rest }) {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken !== null) {
		isAuthenticated = true;
	}
	return isAuthenticated ? (
		<Navigate to={path} replace={true} state={{ from: rest.location }} />
	) : (
		element
	);
}

export default DirectRouter;