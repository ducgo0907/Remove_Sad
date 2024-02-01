import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import WeekSelect from './WeekSelect';
import orderService from '../../services/order.service';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
const initData1 = {
    labels,
    datasets: [
        {
            label: 'Tùy chọn',
            data: Array.from({ length: 7 }).fill(0),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Combo 3 cốc',
            data: Array.from({ length: 7 }).fill(0),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Combo 7 cốc',
            data: Array.from({ length: 7 }).fill(0),
            backgroundColor: 'rgba(100, 90, 132, 0.5)',
        },
    ],
}
const initData2 = {
    labels,
    datasets: [
        {
            label: 'Tùy chọn',
            data: Array.from({ length: 7 }).fill(0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Combo 3 cốc',
            data: Array.from({ length: 7 }).fill(0),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Combo 7 cốc',
            data: Array.from({ length: 7 }).fill(0),
            borderColor: 'rgb(134, 162, 235)',
            backgroundColor: 'rgba(100, 90, 132, 0.5)',
        },
    ],
}
export function Chart() {
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [mainData, setMainData] = useState(initData1);
    const [moneyData, setMoneyData] = useState(initData1);
    const [amount, setAmount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const listType = ["CUSTOM", "COMBO3", "COMBO7"];
    const dataObject = {};
    const dataMoneyObject = {};

    useEffect(() => {
        setAmount(0);
        setRevenue(0);
        listType.forEach((type, index) => {
            const param = {
                type: type,
                dateFrom: selectedStartDate,
                dateTo: selectedEndDate
            }
            dataObject[type] = Array.from({ length: 7 }).fill(0);
            dataMoneyObject[type] = Array.from({ length: 7 }).fill(0);
            orderService.getOrder(param)
                .then(res => {
                    const data = res.data;
                    if (data.statusCode == 1) {
                        const listData = data.data;
                        listData.forEach(data => {
                            const index = convertDate(data.createdAt) == 0 ?  6: convertDate(data.createdAt) - 1;
                            setRevenue(prevRevenue => prevRevenue + data.money);
                            if (type === "COMBO3") {
                                setAmount(prevAmount => prevAmount + 3);
                            } else if (type === "COMBO7") {
                                setAmount(prevAmount => prevAmount + 7);
                            } else {
                                setAmount(prevAmount => prevAmount + 1);
                            }
                            dataObject[type][index]++;
                            dataMoneyObject[type][index] += data.money;
                        })
                    }
                    setMainData({
                        labels,
                        datasets: [
                            {
                                label: 'Tùy chọn',
                                data: dataObject["CUSTOM"],
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                            {
                                label: 'Combo 3 cốc',
                                data: dataObject["COMBO3"],
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            },
                            {
                                label: 'Combo 7 cốc',
                                data: dataObject["COMBO7"],
                                backgroundColor: 'rgba(100, 90, 132, 0.5)',
                            },
                        ],
                    })
                    setMoneyData({
                        labels,
                        datasets: [
                            {
                                label: 'Tùy chọn',
                                data: dataMoneyObject["CUSTOM"],
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                            {
                                label: 'Combo 3 cốc',
                                data: dataMoneyObject["COMBO3"],
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            },
                            {
                                label: 'Combo 7 cốc',
                                data: dataMoneyObject["COMBO7"],
                                backgroundColor: 'rgba(100, 90, 132, 0.5)',
                            },
                        ],
                    })
                    console.log(moneyData, mainData);
                })
                .catch(err => {
                    console.log(err)
                })
        })

    }, [selectedStartDate])
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Số lượng bán từ ngày ${selectedStartDate} - ${selectedEndDate}`,
            },
        },
    };
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Doanh số từ ngày ${selectedStartDate} - ${selectedEndDate}`,
            },
        },
    }

    const convertDate = (utcDateString) => {
        const date = new Date(utcDateString);
        // Convert to Vietnam time
        date.setHours(date.getHours() + 7); // Assuming Vietnam is 7 hours ahead of UTC
        // Get the day of the week as a number (0 for Sunday, 1 for Monday, etc.)
        const dayOfWeekNumber = date.getDay();
        console.log(date, dayOfWeekNumber);
        return dayOfWeekNumber;
    }
    return (
        <div className='container'>
            <div className='row'>
                <h2>Chọn doanh thu của tuần</h2>
            </div>
            <div className='row'>
                <WeekSelect
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    setSelectedStartDate={setSelectedStartDate}
                    setSelectedEndDate={setSelectedEndDate}
                />
            </div>
            <div className='row'>
                <div className='col-6'>
                    <h3>Tổng số lượng bán ra: {amount} </h3>
                    <Bar options={options} data={mainData} />;
                </div>
                <div className='col-6'>
                    <h3>Tổng doanh thu: {revenue}</h3>
                    <Line options={options} data={moneyData} />;
                </div>
            </div>
        </div>
    )
}
