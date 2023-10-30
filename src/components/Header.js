import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
function Header() {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const nav = useNavigate();

    console.log(token);

	const handleLogOut = () =>{
		localStorage.clear();
        nav('/')
	}


    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Pilyr</Link>
                        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        {token && <div>
                            <a href='/Remove_Sad' className=''><button className="w-20 rounded" onClick={() => handleLogOut()}>Logout</button></a>
                        </div>}
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;