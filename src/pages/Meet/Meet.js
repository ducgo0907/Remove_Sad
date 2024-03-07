import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import meetService from '../../services/meet.service';
import Swal from 'sweetalert2';
import './meet.css'

function Meet() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmit, setSubmit] = useState(false);
    const [history, setHistory] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(selectedDate === '' || selectedEndTime == '' || selectedStartTime === '' || address === '' || phone === ''){
            setSubmit(true);
            return;
        }
        // Handle form submission here
        const startDateString = `${selectedDate}T${selectedStartTime}:00`;
        const endDateString = `${selectedDate}T${selectedEndTime}:00`;

        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        const meet = {
            timeStart: startDate.toISOString(),
            timeEnd: endDate.toISOString(),
            address: address,
            phone: phone
        }
        meetService.createMeet(meet)
            .then(response => {
                const data = response.data.data;
                if (data.statusCode == 0) {
                    Swal.fire({ title: "Thông báo", text: data.content })
                } else {
                    Swal.fire({ text: "Đặt thành công, vui lòng chờ Pilyr xác nhận, trong trường hợp quá lâu không có ai xác nhận, vui lòng liên hệ với fanpage. Xin chân thành cảm ơn" })
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    useEffect(() => {
        meetService.getHistory()
            .then(response => {
                console.log(response, "hihi");
                setHistory(response.data)
            })
            .catch(error => {
                console.log("eror", error);
            })
    }, [])

    const convertDate = (input) => {
        const date = new Date(input);
        date.setHours(date.getHours() + 7);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formattedDate;
    }

    return (
        <Form onSubmit={handleSubmit} className='container'>
            <h2 className='text-center'>Chọn ngày giờ gặp mặt với Pilyr nào!</h2>
            <Form.Group controlId="selectedDate">
                <Form.Label>Chọn ngày:</Form.Label>
                <Form.Control
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <div style={{color: 'red'}}>{selectedDate === '' && isSubmit ? 'Vui lòng chọn ngày bắt đầu' : ''}</div>
            </Form.Group>

            <Form.Group controlId="selectedStartTime">
                <Form.Label>Chọn giờ bắt đầu:</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedStartTime}
                    onChange={(e) => setSelectedStartTime(e.target.value)}
                >
                    <option value="">Chọn giờ</option>
                    {[...Array(24).keys()].map((hour) => (
                        <option key={hour} value={`${hour < 10 ? '0' + hour : hour}:00`}>{`${hour}:00`}</option>
                    ))}
                </Form.Control>
                <div style={{color: 'red'}}>{selectedStartTime === '' && isSubmit ? 'Vui lòng chọn giờ bắt đầu' : ''}</div>
            </Form.Group>

            <Form.Group controlId="selectedEndTime">
                <Form.Label>Chọn giờ kết thúc:</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedEndTime}
                    onChange={(e) => setSelectedEndTime(e.target.value)}
                >
                    <option value="">Chọn giờ</option>
                    {[...Array(24).keys()].map((hour) => (
                        <option key={hour} value={`${hour < 10 ? '0' + hour : hour}:00`}>{`${hour}:00`}</option>
                    ))}
                </Form.Control>
                <div style={{color: 'red'}}>{selectedEndTime === '' && isSubmit ? 'Vui lòng chọn giờ kết thúc' : ''}</div>
            </Form.Group>

            <Form.Group controlId="address">
                <Form.Label>Địa chỉ:</Form.Label>
                <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <div style={{color: 'red'}}>{address === '' && isSubmit ? 'Vui lòng nhập địa chỉ gặp mặt' : ''}</div>
            </Form.Group>

            <Form.Group controlId="address">
                <Form.Label>Số điện thoại:</Form.Label>
                <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <div style={{color: 'red'}}>{phone === '' && isSubmit ? 'Vui lòng nhập số điện thoại của bạn' : ''}</div>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
            <h3>Lịch sử đặt cuộc nói chuyện</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Địa chỉ</th>
                        <th>Tình trạng</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((meet) => (
                        <tr key={meet._id}>
                            <td>{convertDate(meet.timeStart)}</td>
                            <td>{convertDate(meet.timeEnd)}</td>
                            <td>{meet.address}</td>
                            <td className={meet.status}>{meet.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Form>
    );
}

export default Meet;
