import React, { useState } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import orderService from '../../services/order.service';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const MySwal = withReactContent(Swal);

const PaymentForm = (props) => {
	const [coffee, setCoffee] = useState(0);
	const [selectedOption, setSelectedOption] = useState('CUSTOM');
	const [code, setCode] = useState(null);
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
		const amountInVND = coffee * 20000;
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
		switch(event.target.value){
			case 'CUSTOM':
				setCoffee(0);
				break;
			case 'COMBO3':
				setCoffee(3);
				break;
			case 'COMBO7':
				setCoffee(7);
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
							<img src='QR_BIDV.jpg' />
						</Col>
						<Col xs={6}>
							<h2>Để mua cà phê, vui lòng chuyển khoản số tiền: {coffee * 20000} đến tài khoản bên cạnh với nội dung chuyển khoản: <span style={{color: 'red'}}>{code}</span> để nạp tiền</h2>
							<div>Số Tài Khoản: 4270787394</div>
							<div>Ngân hàng: BIDV</div>
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
											disabled={selectedOption !=='CUSTOM'}
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
						</Row>
					</FormGroup>

					<Button className='mt-2' type="submit" id="btnPopup">Thanh toán</Button>
					<Col xs={12} className='align-middle text-center justify-content-center'>
						Tổng tiền = {coffee * 20000} VNĐ
					</Col>
				</Form>
			}
			<p>&nbsp;</p>
		</Container>
	);
};

export default PaymentForm;