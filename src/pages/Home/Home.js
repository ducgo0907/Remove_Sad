import React from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			<h1>Welcome to Your Website</h1>
			<p>Your introduction text goes here.</p>
			<Link to="/about">Learn more about us</Link>
		</div>
	);
}

export default Home;