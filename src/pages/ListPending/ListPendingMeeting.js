import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './ListPending.css'
import { useNavigate } from 'react-router-dom';
import meetService from '../../services/meet.service';
import Swal from 'sweetalert2';


function ListPendingMeeting() {
    const [history, setHistory] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        meetService.getAll()
            .then(response => {
                console.log(response, "hihi");
                setHistory(response.data)
            })
            .catch(error => {
                console.log("eror", error);
            })
    }, [])

    const approve = (status, meetId) => {
        const message = status === "APPROVE" ? "Bạn có chắc chắn đồng ý gặp mặt với người dùng không?" :
            "Bạn chắc chắn muốn hủy bỏ cuộc gặp mặt không?";
        const object = {
            meetId,
            status
        }
        Swal.fire({
            icon: 'warning',
            text: message,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Quay lại",
            cancelButtonColor: "red",
            showCancelButton: true,
            customClass: {
                confirmButton: 'col-6',
                cancelButton: 'col-6'
            }
        })
            .then(response => {
                if (response.isConfirmed) {
                    meetService.approve(object)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {

                        })
                }
            })

    }

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
        <Table striped bordered hover className='container'>
            <thead>
                <tr>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Địa chỉ</th>
                    <th>Tình trạng</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {history.map((meet) => (
                    <tr key={meet._id}>
                        <td>{convertDate(meet.timeStart)}</td>
                        <td>{convertDate(meet.timeEnd)}</td>
                        <td>{meet.address}</td>
                        <td className={meet.status}>{meet.status}</td>
                        <td>
                            <button
                                className="btn btn-success btn-pending"
                                onClick={() => approve("APPROVE", meet._id)}
                                style={meet.status === "PENDING" ? {display: 'block'} : {display: 'none'}}
                            >
                                Đồng ý
                            </button>
                            <button
                                className="btn btn-danger btn-pending"
                                onClick={() => approve("REFUSE", meet._id)}
                                style={meet.status === "PENDING" ? {display: 'block'} : {display: 'none'}}
                            >
                                Từ chối
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ListPendingMeeting;
