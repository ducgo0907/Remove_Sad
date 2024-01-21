import React, { useState } from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import orderService from '../../services/order.service';

const PaymentForm = (props) => {
	const [coffee, setCoffee] = useState(0);
	const [code, setCode] = useState(null);

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const user = props.user;
		if(!user || user.email == undefined || !user.email.includes("@")){
			alert("Vui lòng đăng nhập trước khi nạp tiền")
			return;
		}
		if (coffee < 1) {
			alert("Số cà phê bạn mua phải lớn hơn 1");
			return;
		}
		// Convert coffee to VNĐ before submission if needed
		const amountInVND = coffee * 20000;
		orderService.createOrder(amountInVND)
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
							<h2>Vui lòng chuyển khoản số tiền: {coffee * 20000} đến tài khoản bên cạnh với nội dung chuyển khoản: {code} để nạp tiền</h2>
							<div>Số Tài Khoản: 4270787394</div>
							<div>Ngân hàng: BIDV</div>
						</Col>
					</Row>
				</div>
				:
				<Form action="create_payment_url" method="POST" onSubmit={handleFormSubmit}>
					<FormGroup>
						<Row xs={12}>
							<Col xs={3}>
								<FormLabel htmlFor="coffee">Coffee</FormLabel>
								<FormControl
									type="number"
									id="coffee"
									name="coffee"
									placeholder="Number of coffees"
									value={coffee}
									onChange={(e) => setCoffee(e.target.value)}
								/>
							</Col>
							<Col xs={2}>
								<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Coffee_cup_icon.svg/2137px-Coffee_cup_icon.svg.png' alt="coffe" />
							</Col>
							<Col xs={6} className='align-middle'>
								Tổng tiền = {coffee * 20000} VNĐ
							</Col>
						</Row>
					</FormGroup>

					<Button className='mt-2' type="submit" id="btnPopup">Thanh toán</Button>
				</Form>
			}
			<p>&nbsp;</p>
		</Container>
	);
};

export default PaymentForm;