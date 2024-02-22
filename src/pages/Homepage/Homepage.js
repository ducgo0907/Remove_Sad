import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "../Homepage/Homepage.css"
function Homepage() {
    return (
        <div>
            {/* <header className="relative">
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
            </header> */}

            <div className="banner">
                <div className="banner-content">
                    <h1>Gom nỗi niềm, trả thảnh thơi.</h1>
                    <p>Pilyr - người lạ đáng tin cậy.</p>
                    <button style={{width: "fit-content", borderRadius:"15px"}}><Link style={{fontSize: "1.5em"}} className="navbar-brand" to="/home">Khám phá Pilyr <i style={{marginLeft:"10px"}} class="fa-solid fa-arrow-right"></i></Link></button>
                    <button style={{width: "fit-content", borderRadius:"15px", marginTop:"1em"}}><Link style={{fontSize: "1.5em"}} className="navbar-brand" to="/guideline">Hướng dẫn <i style={{marginLeft:"10px"}} class="fa-solid fa-arrow-right"></i></Link></button>
                </div>
                <img src="mascot.jpg" alt="img" />
            </div>

            <div className="about">
                <h1>Giới Thiệu</h1>
                <div className="about-content">
                    <p>Pilyr</p>
                    <p>Dịch vụ kinh doanh, “Gom nỗi niềm, trả thảnh thơi”.

                        Chúng tôi gom lại, thu vén mọi nỗi niềm của bạn. Chúng tôi là những người lắng nghe, tâm sự, không đánh giá, không phát xét.

                        Chúng tôi sẽ chỉ đưa lời khuyên nếu như khách hàng cần.

                        Cảm ơn và Pilyr luôn bên bạn <i class="fa-solid fa-heart"></i></p>
                </div>
                <div className="about-img">
                    <img src="/pilyr-logo.png" alt="img" />
                </div>
            </div>

            <div className="therapy">
                <div className="therapy-content bg-lime-100">
                    <p>01.</p>
                    <h1>Tầm Nhìn</h1>
                    <p>Pilyr không chỉ là một dịch vụ lắng nghe, mà là người bạn đồng hành tin cậy của thế hệ gen Y và gen Z ở khu vực Hà Nội. Chúng tôi mong muốn trở thành một “người lạ đáng tin cậy” sẵn sàng lắng nghe, chia sẻ và hiểu được mọi niềm vui và nỗi buồn của bạn.</p>
                </div>
                <div className="therapy-content bg-gray-100">
                    <p>02.</p>
                    <h1>Sứ Mệnh</h1>
                    <p>"Sự hài lòng của bạn là niềm vinh hạnh của chúng tôi." Pilyr cam kết đem đến cho cộng đồng dịch vụ lắng nghe tốt nhất, không chỉ thông qua sự chuyên nghiệp mà còn qua sự trân trọng, tình yêu và trách nhiệm cao với cuộc sống con người và xã hội. Chúng tôi là nơi bạn có thể tìm thấy sự chân thành và sự chia sẻ.</p>
                    {/* <button>View More Service</button> */}
                </div>
                <div className="therapy-content bg-teal-100">
                    <p>03.</p>
                    <h1>Giá Trị Cốt Lõi</h1>
                    <p>Chân Thành - Tận Tâm - Tín Nhiệm - Sáng Tạo - Tốc Độ</p>
                </div>
            </div>

            <div className="article">
                <h1>Bài Viết Của Pilyr</h1>
                <div className="article-container">
                    <div className="cards">
                        <div className="article-content">
                            <img src="postcard1.png" alt="img" />
                            {/* <p>Understanding PTSD</p> */}
                            <a style={{textDecoration: "none"}} href="https://www.facebook.com/61555981224289/videos/414192127836456" target="_blank"><p>Postcard 01</p></a>
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
                            <img src="postcard2.png" alt="img" />
                            <a style={{textDecoration: "none"}} href="https://www.facebook.com/61555981224289/videos/414192127836456" target="_blank"><p>Postcard 02</p></a>
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
                    <a href="https://www.facebook.com/profile.php?id=61555981224289"><i class="fa-brands fa-facebook"></i></a>
                </div>
                <p>© 2024 Pilyr. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Homepage