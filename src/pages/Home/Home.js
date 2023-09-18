import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<h1>Welcome to Remoe Sad</h1>
			<Link to="/about">Learn more about us</Link>
		</div>
	);
}

export default Home;