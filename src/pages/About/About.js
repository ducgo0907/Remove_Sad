import { Link } from "react-router-dom";
import React from "react";
import "../About/About.css"

function About() {
	return (
		<div>
			<header className="relative">
				<nav className="navbar navbar-expand-lg navbar-light bg-light fixed top-0 left-0 right-0">
					<div className="container">
						<Link className="navbar-brand" to="/">Pilyr</Link>
						<div>
							<Link className="navbar-brand font-thin" to="/home">Home</Link>
							<Link className="navbar-brand font-thin" to="/about">About</Link>
							<Link className="navbar-brand font-thin" to="/">Service</Link>
							<Link className="navbar-brand font-thin" to="/">Blog</Link>
							<Link className="navbar-brand font-thin" to="/">Contact</Link>
						</div>
					</div>
				</nav>
			</header>

			<div className="about">
				<h1>About</h1>
				<div className="about-content">
					<p>Pilyr</p>
					<p>I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.</p>
				</div>
				<div className="about-img">
					<img src="https://static.wixstatic.com/media/9c608a_2a78cf5937414d0e9a597504d68daafc~mv2_d_6046_4035_s_4_2.jpg/v1/crop/x_776,y_0,w_3647,h_4035/fill/w_519,h_572,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c608a_2a78cf5937414d0e9a597504d68daafc~mv2_d_6046_4035_s_4_2.jpg" alt="img" />
				</div>
			</div>

			<div className="about-detail">
				<h1>Experience</h1>
				<div className="exp">
					<p>I'm a title.
						Click here to edit.
					</p>
					<p>
						I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
					</p>
				</div>

				<h1>Qualifications</h1>
				<div className="qual">
					<div className="milestone">
						<p>2023 - Present</p>
						<p>I am a description. Click here to edit.</p>
					</div>
					<div className="milestone">
						<p>2014 - 2023</p>
						<p>I am a description. Click here to edit.</p>
					</div>
					<div className="milestone">
						<p>2009 - 2013</p>
						<p>I am a description. Click here to edit.</p>
					</div>
					<div className="milestone">
						<p>2008</p>
						<p>I am a description. Click here to edit.</p>
					</div>
					<div className="milestone">
						<p>2004 - 2007</p>
						<p>I am a description. Click here to edit.</p>
					</div>
					<div className="milestone">
						<p>2003</p>
						<p>I am a description. Click here to edit.</p>
					</div>
				</div>
			</div>

			<div className="footer">
				<div className="flex-row space-x-5">
					<i class="fa-brands fa-twitter"></i>
					<i class="fa-brands fa-facebook"></i>
				</div>
				<p>© 2024 Pilyr. All Rights Reserved.</p>
			</div>
		</div>
	);
}

export default About;