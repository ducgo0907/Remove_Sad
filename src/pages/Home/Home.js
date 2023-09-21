import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Home/home.css";
import avatar from "../../asset/O2.jpg"

function Home() {
	const nav = useNavigate();
	const [userName, setUserName] = useState("");

	const handleNameChange = (e) => {
		setUserName(e.target.value);
	};

	const goToChat = (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		if (userName.trim() !== "") {
			nav("/chat");
		} else {
			alert("Please enter your name.");
		}
	};

	return (
		<div className="container">
			<div className="row-auto">
				<div>
					<h1>Pilyr online chat</h1>
				</div>

				<div className="login">
					<form onSubmit={goToChat}>
						<input
							type="text"
							className="name required:border-red-500 mt-4 text-lg min-w-full"
							placeholder="Enter your name..."
							value={userName}
							onChange={handleNameChange}
							required
						/>
						<hr/>
						<div className="user-photos flex-col gap">
							<div className="col-span-12">
								<h3 className="text-center mt-4">Pick your avatar.</h3>
							</div>
							<div className="photo-gallery grid grid-cols-3 gap-4 p-5">
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
								<div className="flex justify-center">
									<div class="flex justify-center">
										<img class="rounded-full" src={avatar} /></div>
								</div>
							</div>
							<div className="row-span-6 p-3">
								<button className="rounded-full bg-sky-500" type="submit">Let's Chat</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Home;