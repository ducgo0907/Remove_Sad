import { Link } from "react-router-dom";
import React from "react";
import "../Guideline/Guideline.css"

function Guideline() {
    return (
        <div>
            <div className="guideline bg-teal-100">
                <div className="step">
                    <h1>Bước 1: Chuẩn Bị</h1>
                    <p>Điền tên của mình, chọn 1 chiếc avatar thật dễ thương và bấm vào "Let's Chat" để trải nghiệm dụng dịch vụ của Pilyr nhé!! 
                        Pilyr sẽ miễn phí cho lần truy cập đầu tiên nhưng nhớ đăng nhập cho các lần sử dụng tiếp theo nha!!</p>
                </div>
                <img src="/service.png" alt="img" />
            </div>

            <div className="guideline bg-teal-100">
                <img src="/login.png" alt="img" />
                <div className="step">
                    <h1>Bước 2: Đăng Nhập</h1>
                    <p>Để đăng nhập, bạn chỉ cần điền email và password của tài khoản bạn đã đăng ký sao dó chọn "Login". 
                        Nếu chưa có tài khoản thì bắt đầu đăng ký thôi nàooo !!</p>
                </div>
            </div>

            <div className="guideline bg-teal-100 ">
                <div className="step">
                    <h1>Bước 3: Đăng Ký</h1>
                    <p>
                        Chỉ cần điền tên, email và password (tối thiểu 8 ký tự) rồi bấm "Register". 
                        Sau khi có thông báo đăng ký thành công thì quay trở lại đăng nhập thôi nào
                    </p>
                </div>
                <img src="/register.png" alt="img" />
            </div>

            <div className="guideline bg-teal-100 ">
                <img src="/payment.png" alt="img" />
                <div className="step">
                    <h1>Bước 4: Mua Coffee</h1>
                    <p>Mỗi ly coffee sẽ giúp bạn có thể trò chuyện cùng Pilyr trong vòng 20 phút. 
                        Một ly coffee sẽ giúp bạn luôn tỉnh táo xuyên suốt quá trình trò chuyện cùng Pilyr. 
                        Bạn có thể mua số lượng tùy chọn hoặc mua theo combo của Pilyr nhé!!
                    </p>
                </div>
            </div>

            <div className="guideline bg-teal-100 ">
                <div className="step">
                    <h1>Bước 5: Thanh Toán</h1>
                    <p>
                        Quét mã QR, nhập mã OTP hiển thị trên màn hình vào nội dung chuyển khoản để thanh toán. 
                        Sau khi thanh toán thành công hãy đợi ít phút, Pilyr sẽ ship coffee đến cho bạn.
                    </p>
                </div>
                <img src="/verify.png" alt="img" />
            </div>
            
            <div className="guideline bg-teal-100">
                <img src="/notation.png" alt="img" />
                <div className="step">
                    <h1>Bước 6: Trò Chuyện cùng Pilyr</h1>
                    <p>
                        Chọn "Đồng ý" để xác nhận sử dụng 1 ly coffee. 
                        Và đương nhiên, Pilyr luôn miễn phí cho lần trải nghiệm đầu tiên.
                    </p>
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

export default Guideline;