import React from 'react';
import { Container, Form, FormGroup, FormLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import orderService from '../../services/order.service';

const PaymentForm = (props) => {
	const [coffee, setCoffee] = React.useState(0);
	const [bankCode, setBankCode] = React.useState('VNPAYQR');
	const [language, setLanguage] = React.useState('vn');

	const handleFormSubmit = (event) => {
		event.preventDefault();
		if(coffee < 1){
			alert("Coffe must be greater or equal than 1");
			return ;
		}
		// Convert coffee to VNĐ before submission if needed
		const amountInVND = coffee * 40000;
		// Add your form submission logic here with the amountInVND
		const formData = {
			amount: amountInVND,
			bankCode: bankCode,
			language: language
		}
		console.log(formData);
		orderService.createPaymentUrl(formData)
			.then(res => {
				console.log(res);
				window.location.replace(res.data);
			})
			.catch(err =>{
				console.log(err);
			})
	};

	return (
		<Container>
			<h3>{props.title}</h3>
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
						<Col xs={6}>
							Tổng tiền = {coffee * 40000} VNĐ
						</Col>
					</Row>
				</FormGroup>

				<FormGroup>
					<FormLabel>Chọn Phương thức thanh toán:</FormLabel>
					<Row>
						<Col>
							<Form.Check
								type="radio"
								name="bankCode"
								id="defaultPaymentMethod"
								label="Cổng thanh toán VNPAYQR"
								value=""
								checked={bankCode === ''}
								onChange={() => setBankCode('')}
							/>
						</Col>
						<Col>
							<Form.Check
								type="radio"
								name="bankCode"
								id="vnpayqrPaymentMethod"
								label="Thanh toán qua ứng dụng hỗ trợ VNPAYQR"
								value="VNPAYQR"
								checked={bankCode === 'VNPAYQR'}
								onChange={() => setBankCode('VNPAYQR')}
							/>
						</Col>
						<Col>
							<Form.Check
								type="radio"
								name="bankCode"
								id="vnbankPaymentMethod"
								label="Thanh toán qua ATM-Tài khoản ngân hàng nội địa"
								value="VNBANK"
								checked={bankCode === 'VNBANK'}
								onChange={() => setBankCode('VNBANK')}
							/>
						</Col>
						<Col>
							<Form.Check
								type="radio"
								name="bankCode"
								id="intcardPaymentMethod"
								label="Thanh toán qua thẻ quốc tế"
								value="INTCARD"
								checked={bankCode === 'INTCARD'}
								onChange={() => setBankCode('INTCARD')}
							/>
						</Col>
					</Row>
				</FormGroup>

				<FormGroup>
					<FormLabel>Ngôn ngữ:</FormLabel>
					<Row>
						<Col>
							<Form.Check
								type="radio"
								name="language"
								id="vnLanguage"
								label="Tiếng việt"
								value="vn"
								checked={language === 'vn'}
								onChange={() => setLanguage('vn')}
							/>
						</Col>
						<Col>
							<Form.Check
								type="radio"
								name="language"
								id="enLanguage"
								label="Tiếng anh"
								value="en"
								checked={language === 'en'}
								onChange={() => setLanguage('en')}
							/>
						</Col>
					</Row>
				</FormGroup>

				<Button type="submit" id="btnPopup">Thanh toán</Button>
			</Form>

			<p>&nbsp;</p>
		</Container>
	);
};

export default PaymentForm;