import React, { useState } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import orderService from '../../services/order.service';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { logRoles } from '@testing-library/react';


const MySwal = withReactContent(Swal);

const PaymentForm = (props) => {
	const [coffee, setCoffee] = useState(0);
	const [selectedOption, setSelectedOption] = useState('CUSTOM');
	const [code, setCode] = useState(null);
	const [coffeFee, setCoffeFee] = useState(20000);
	const nav = useNavigate();

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const user = props.user;
		if (!user || user.email == undefined || !user.email.includes("@")) {
			MySwal.fire({
				text: "Vui lòng đăng nhập trước khi nạp tiền",
				confirmButtonText: "Login",
				showCancelButton: true,
				cancelButtonText: "Quay lại",
				customClass: {
					confirmButton: 'col-12',
					cancelButton: 'col-12'
				}
			})
				.then(response => {
					if (response.isConfirmed) {
						nav('/login')
					}
				})
			return;
		}
		if (coffee < 1) {
			MySwal.fire({
				text: "Số cà phê bạn mua phải lớn hơn 1",
				confirmButtonText: "OK",
				customClass: {
					confirmButton: 'col-12'
				}
			})
			return;
		}
		// Convert coffee to VNĐ before submission if needed
		const amountInVND = coffee * coffeFee;
		const body = {
			money: amountInVND,
			type: selectedOption
		}
		orderService.createOrder(body)
			.then(res => {
				const data = res.data;
				if (data != undefined && data.statusCode === 1) {
					setCode(data.content.code);
				}
			})
			.catch(err => {
				console.log(err);
			})
	};

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
		switch (event.target.value) {
			case 'CUSTOM':
				setCoffee(0);
				break;
			case 'COMBO3':
				setCoffee(3);
				setCoffeFee(19000);
				break;
			case 'COMBO7':
				setCoffeFee(18000);
				setCoffee(7);
				break;
			case 'MEETING':
				setCoffeFee(150000);
				setCoffee(1);
				break;
			case 'MEMBER':
				setCoffeFee(100000)
				setCoffee(1);
				break;
			default:
				break;
		}
	};

	return (
		<Container>
			<h3>{props.title}</h3>
			{code ?
				<div>
					<Row xs={12}>
						<Col xs={6}>
							<img style={{ width: "70%" }} src='QR_BIDV.jpg' />
						</Col>
						<Col xs={6}>
							<h2>Để mua cà phê, vui lòng chuyển khoản số tiền: {(coffee * coffeFee).toLocaleString()} đến tài khoản bên cạnh với nội dung chuyển khoản: <span style={{ color: 'red' }}>{code}</span> để nạp tiền</h2>
							<div style={{ fontSize: "1.5em" }}>
								<div>Số Tài Khoản: 4270787394</div>
								<div>Ngân hàng: BIDV</div>
							</div>
							<h2 style={{ marginTop: "2rem" }}>Pilyr đang pha coffee, vui lòng đợi ít phút...</h2>
							<img style={{ width: "100%" }} src='https://kenh14cdn.com/thumb_w/600/203336854389633024/2021/8/31/photo1630402190645-1630402190840825942204.gif' />
						</Col>
					</Row>
				</div>
				:
				<Form action="create_payment_url" method="POST" onSubmit={handleFormSubmit}>
					<FormGroup>
						<Row xs={12}>
							<Col xs={2}>
								<Row>
									<label>
										<input
											type="radio"
											value="CUSTOM"
											checked={selectedOption === 'CUSTOM'}
											onChange={handleOptionChange}
										/>&nbsp;
										Tùy chọn
									</label>
									<Col xs={10}>
										<FormControl
											type="number"
											id="coffee"
											name="coffee"
											placeholder="Number of coffees"
											value={coffee}
											onChange={(e) => setCoffee(e.target.value)}
											disabled={selectedOption !== 'CUSTOM'}
										/>
									</Col>
								</Row>
							</Col>
							<Col xs={2}>
								<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Coffee_cup_icon.svg/2137px-Coffee_cup_icon.svg.png' alt="coffe" />
							</Col>
							<Col xs={3}>
								<Row>
									<label>
										<input
											type="radio"
											value="COMBO3"
											checked={selectedOption === 'COMBO3'}
											onChange={handleOptionChange}
										/>&nbsp;
										Gói combo 3
									</label>
								</Row>
								<img src='/combo3.png' alt="coffe" />
							</Col>
							<Col xs={3}>
								<Row>
									<label>
										<input
											type="radio"
											value="COMBO7"
											checked={selectedOption === 'COMBO7'}
											onChange={handleOptionChange}
										/>&nbsp;
										Gói combo 7
									</label>
								</Row>
								<img src='/combo7.png' alt="coffe" />
							</Col>
							<Col xs={4}>
								<Row>
									<label>
										<input
											type="radio"
											value="MEETING"
											checked={selectedOption === 'MEETING'}
											onChange={handleOptionChange}
										/>&nbsp;
										Gói cà phê gặp mặt
									</label>
								</Row>
								<img src='/chat.png' alt="coffe" />
							</Col>
							<Col xs={3}>
								<Row>
									<label>
										<input
											type="radio"
											value="MEMBER"
											checked={selectedOption === 'MEMBER'}
											onChange={handleOptionChange}
										/>&nbsp;
										Gói hội viên tháng
									</label>
								</Row>
								<img src='/membership-tag.png' alt="coffe" />
							</Col>
						</Row>
					</FormGroup>

					<Button className='mt-2' type="submit" id="btnPopup">Thanh toán</Button>
					<Col xs={12} className='align-middle text-center justify-content-center'>
						Tổng tiền = {(coffee * coffeFee).toLocaleString()} VNĐ
					</Col>
				</Form>
			}
			<p>&nbsp;</p>
			{!props.user.isVipMember && <div className='advertis'>
            <a className='nonfat' href="https://www.facebook.com/profile.php?id=61555888590527" target="_blank" rel="noreferrer">
                <img src='nonFatBakery.png' alt='img'/>
            </a>
            <a className='wonder' href="https://www.facebook.com/Wonderlandstoreexe" target="_blank" rel="noreferrer">
                <img src='wonderlandStore.png' alt='img'/>
            </a>
            <a className='owl' href="https://www.facebook.com/profile.php?id=61555679864702" target="_blank" rel="noreferrer">
                <img  src='owlBeauty.png' alt='img'/>
            </a>
        </div>
        }
		</Container>
	);
};

export default PaymentForm;