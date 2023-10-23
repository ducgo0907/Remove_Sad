import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/auth.service';


let isAuthenticated = false;
function AdminRouter({ element, path, ...rest }) {
	const user = authService.getCurrentUser();
	if (user !== null && user.isAdmin) {
		isAuthenticated = true;
	}
	return isAuthenticated ? (
		element
	) : (
		<Navigate to={path} replace={true} state={{ from: rest.location }} />
	);
}

export default AdminRouter;