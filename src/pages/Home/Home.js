import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Home/home.css";
import avatar from "../../asset/O2.jpg";

function Home() {
  const nav = useNavigate();
  const [userName, setUserName] = useState("");

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const goToChat = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (userName.trim() !== "") {
      // You can also pass the username and selected avatar to the chat route
      nav("/chat", { state: { userName } });
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
            <hr />
            <div className="user-photos flex-col gap">
              <div className="col-span-12">
                <h3 className="text-center mt-4">Pick your avatar.</h3>
              </div>
              <div className="photo-gallery grid grid-cols-3 gap-4 p-5">
                {/* You can map through an array of avatars and generate the elements */}
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="flex justify-center">
                    <div className="flex justify-center">
                      <img className="rounded-full" src={avatar} alt={`Avatar ${index + 1}`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="row-span-6 p-3">
                <button className="rounded-full bg-sky-500" type="submit">
                  Let's Chat
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;