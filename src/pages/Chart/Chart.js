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
import WeekSelectMonth from './WeekSelectMonth';

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

let labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
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
export function Chart() {
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [mainData, setMainData] = useState(initData1);
    const [moneyData, setMoneyData] = useState(initData1);
    const [amount, setAmount] = useState(0);
    const [specialAmount, setSpecialAmount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [option, setOption] = useState(1);
    const listType = ["CUSTOM", "COMBO3", "COMBO7", "MEETING"];
    const dataObject = {};
    const dataMoneyObject = {};
    let labelMonth = []

    function getDaysInMonth() {
        const lastDayOfMonth = new Date(selectedEndDate).getDate();
        // Create an array containing the days of the month
        return Array.from({ length: lastDayOfMonth }, (_, index) => "Ngày " + (index + 1));
    }

    useEffect(() => {
        if(option == 1){
            labels = getDaysInMonth();
        }else{
            labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
        }
        setAmount(0);
        setRevenue(0);
        setSpecialAmount(0);
        listType.forEach((type, index) => {
            const param = {
                type: type,
                dateFrom: selectedStartDate,
                dateTo: selectedEndDate
            }
            if(option == 0){
                dataObject[type] = Array.from({ length: 7 }).fill(0);
                dataMoneyObject[type] = Array.from({ length: 7 }).fill(0);
            }else{
                dataObject[type] = Array.from({ length: labels.length }).fill(0);
                dataMoneyObject[type] = Array.from({ length: labels.length }).fill(0);
            }

            orderService.getOrder(param)
                .then(res => {
                    const data = res.data;
                    if (data.statusCode == 1) {
                        const listData = data.data;
                        listData.forEach(data => {
                            let index;
                            if(option == 0){
                                index = convertDate(data.createdAt) == 0 ? 6 : convertDate(data.createdAt) - 1;
                            }else{
                                index = convertDateToDay(data.createdAt) - 1;
                            }
                            setRevenue(prevRevenue => prevRevenue + data.money);
                            if (type === "COMBO3") {
                                setAmount(prevAmount => prevAmount + 3);
                                dataObject[type][index]++;
                            } else if (type === "COMBO7") {
                                setAmount(prevAmount => prevAmount + 7);
                                dataObject[type][index]++;
                            } else if (type === "CUSTOM"){
                                setAmount(prevAmount => prevAmount + data.money / 20000);
                                dataObject[type][index] += data.money / 20000;
                            }else {
                                setSpecialAmount(prevAmount => prevAmount + 1);
                                dataObject[type][index]++;
                            }
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
                            {
                                label: 'Gặp mặt',
                                data: dataObject["MEETING"],
                                backgroundColor: 'rgba(130, 70, 20, 0.5)',
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
                            {
                                label: 'Gặp mặt',
                                data: dataMoneyObject["MEETING"],
                                backgroundColor: 'rgba(130, 70, 20, 0.5)',
                            },
                        ],
                    })
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
        return dayOfWeekNumber;
    }

    const convertDateToDay = (utcDateString) => {
        const date = new Date(utcDateString);
        // Convert to Vietnam time
        date.setHours(date.getHours() + 7); // Assuming Vietnam is 7 hours ahead of UTC
        // Get the day of the week as a number (0 for Sunday, 1 for Monday, etc.)
        const dayOfWeekNumber = date.getDate();
        return dayOfWeekNumber;
    }

    const handleChange = (e) => {
        setOption(e.target.value)
    }
    return (
        <div className='container'>
            <div className='row'>
                <h2>Chọn doanh thu của
                    <select style={{border: 'solid 1px black'}} value={option} onChange={handleChange}>
                        <option value={0}>tuần</option>
                        <option value={1}>tháng</option>
                    </select>
                </h2>
            </div>
            <div className='row'>
                {
                    option == 0 ?
                        <WeekSelect
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                            setSelectedStartDate={setSelectedStartDate}
                            setSelectedEndDate={setSelectedEndDate}
                        />
                        : <WeekSelectMonth
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                            setSelectedStartDate={setSelectedStartDate}
                            setSelectedEndDate={setSelectedEndDate}
                        />

                }
            </div>
            <div className='row'>
                <div className='col-6'>
                    <h3>Tổng số lượng bán ra: {amount} cà phê, {specialAmount} gặp mặt </h3>
                    <Bar options={options} data={mainData} />;
                </div>
                <div className='col-6'>
                    <h3>Tổng doanh thu: {revenue.toLocaleString()}</h3>
                    <Line options={options} data={moneyData} />;
                </div>
            </div>
        </div>
    )
}
