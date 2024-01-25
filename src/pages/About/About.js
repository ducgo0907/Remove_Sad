import { Link } from "react-router-dom";
import React from "react";
import "../About/About.css"

function About() {
	return (
		<div>
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

			<div className="about-detail">
				<h1>Pilyr xin chào!</h1>
				<div className="exp">
					<p>Chào mọi người, chúng mình thuộc dự án "Gom nỗi niềm, trả thảnh thơi".</p>
					<p>
						Nhận thấy rằng trong xã hội hiện nay, nhu cầu được lắng nghe, được giải tỏa, là nhu cầu "Cần", "Thầm kín" ai cũng đã hoặc sẽ có, nhưng không phải ai cũng sẵn sàng để nói ra. Ý tưởng khởi nghiệp "Pilyr ở đây lắng nghe bạn" được hình thành để làm phong phú tài sản tinh thần cho những ai có nhu cầu giãi bày, tâm sự nhưng lại không sẵn sàng chia sẻ vì ngại một ánh nhìn, ngại bị đánh giá hoặc sợ rằng ai đó lợi dụng vấn đề ấy.

						Pilyr sẽ sẽ trở thành người lạ đáng tin cậy để mọi người thể chia sẻ bất kỳ điều gì - một cách ẩn danh. Pilyr sẽ không đánh giá, không phán xét và chỉ đưa lời khuyên khi bạn thực sự cần.

						Dự án của chúng mình sẽ không thể thành công nếu thiếu đi sự yêu thương của tất cả mọi người. Cảm ơn vì mọi người đã đã ghé tới website.
					</p>
				</div>

				<h1>Liên hệ với chúng mình: </h1>
				<div className="qual">
					<div className="milestone">
						<p>Địa chỉ:</p>
						<p>Đại học FPT Hà Nội.</p>
					</div>
					<div className="milestone">
						<p>Website:</p>
						<p>https://pilyr.netlify.app/.</p>
					</div>
					<div className="milestone">
						<p>Gmail:</p>
						<p>pilyrpp@gmail.com.</p>
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