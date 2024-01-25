import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "../Homepage/Homepage.css"
function Homepage() {
    return (
        <div>
            <header className="relative">
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed top-0 left-0 right-0">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Pilyr</Link>
                        <div>
                            <Link className="navbar-brand font-thin" to="/">Home</Link>
                            <Link className="navbar-brand font-thin" to="/about">About</Link>
                            <Link className="navbar-brand font-thin" to="/">Service</Link>
                            <Link className="navbar-brand font-thin" to="/">Blog</Link>
                            <Link className="navbar-brand font-thin" to="/">Contact</Link>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="banner">
                <div className="banner-content">
                    <h1>Online Therapy for Emotional Health</h1>
                    <p>I am a description. Click here to edit.</p>
                </div>
                <img src="https://static.wixstatic.com/media/9c608a_350f9ef8ecf44916abe7927699962ae3~mv2_d_3000_2000_s_2.jpeg/v1/fill/w_872,h_998,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9c608a_350f9ef8ecf44916abe7927699962ae3~mv2_d_3000_2000_s_2.jpeg" alt="img" />
            </div>

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

            <div className="therapy">
                <div className="therapy-content bg-lime-100">
                    <p>01.</p>
                    <h1>Individual Therapy</h1>
                    <p>I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.</p>
                </div>
                <div className="therapy-content bg-gray-100">
                    <p>02.</p>
                    <h1>Group Therapy</h1>
                    <p>I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.</p>
                    {/* <button>View More Service</button> */}
                </div>
                <div className="therapy-content bg-teal-100">
                    <p>03.</p>
                    <h1>Couple Therapy</h1>
                    <p>I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.</p>
                </div>
            </div>

            <div className="article">
                <h1>Articles about Psychology</h1>
                <div className="article-container">
                    <div className="cards">
                        <div className="article-content">
                            <img src="https://static.wixstatic.com/media/84770f_6ae94823ccef48a5bf0ac4650fe562fa~mv2_d_3000_2000_s_2.jpeg/v1/fill/w_292,h_165,fp_0.50_0.50,q_90,enc_auto/84770f_6ae94823ccef48a5bf0ac4650fe562fa~mv2_d_3000_2000_s_2.jpeg" alt="img" />
                            <p>Understanding PTSD</p>
                        </div>
                        <hr />
                        <div className="article-detail">
                            <i class="fa-regular fa-eye"> 250</i>
                            <i class="fa-regular fa-comment"> 6</i>
                            <i class="fa-regular fa-heart text-red-500"> 10</i>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="article-content">
                            <img src="https://static.wixstatic.com/media/03f22a3cb4d543b9b7ffcaae2f53a15f.jpg/v1/fill/w_292,h_165,fp_0.50_0.50,q_90,enc_auto/03f22a3cb4d543b9b7ffcaae2f53a15f.jpg" alt="img" />
                            <p>Why it's okay to argue</p>
                        </div>
                        <hr />
                        <div className="article-detail">
                            <i class="fa-regular fa-eye"> 130</i>
                            <i class="fa-regular fa-comment"> 0</i>
                            <i class="fa-regular fa-heart text-red-500"> 4</i>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="article-content">
                            <img src="https://static.wixstatic.com/media/40c2397700984377a8d5a841d6b818ef.jpg/v1/fill/w_292,h_165,fp_0.50_0.50,q_90,enc_auto/40c2397700984377a8d5a841d6b818ef.jpg" alt="img" />
                            <p>10 ways to de-strees</p>
                        </div>
                        <hr />
                        <div className="article-detail">
                            <i class="fa-regular fa-eye"> 239</i>
                            <i class="fa-regular fa-comment"> 9</i>
                            <i class="fa-regular fa-heart text-red-500"> 23</i>
                        </div>
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
    )
}

export default Homepage