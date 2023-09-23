import React from 'react';
import { Navigate } from 'react-router-dom';


let isAuthenticated = false;
function PrivateRoute({ element, path, ...rest }) {
	const accessToken = localStorage.getItem('accessToken');
	if(accessToken !== null){
		isAuthenticated = true;
	}
	return isAuthenticated ? (
	  element
	) : (
	  <Navigate to={path} replace={true} state={{ from: rest.location }} />
	);
  }

export default PrivateRoute;