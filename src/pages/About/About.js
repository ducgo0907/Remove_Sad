import { Link } from "react-router-dom";

function About() {
	return (
		<div>
			<h2>About Us</h2>
			<p>This is the About Us page.</p>
			<Link to="/">Back to Home</Link>
		</div>
	);
}

export default About;