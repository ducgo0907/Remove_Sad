import React, { useEffect, useState } from 'react';
import './week-select.css'

function WeekSelectMonth({ selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }) {

    const handleMonthChange = (event) => {
        const [year, month] = event.target.value.split('-').map(Number);
        console.log(year,month);
        const selectedDate = new Date(year, month, 1); // Adjust month to start from 0
        const firstDayOfMonth = new Date(year, month -1, 2);
        const lastDayOfMonth = new Date(year, month, 1); // Adjust to get the last day of the selected month
    
        setSelectedStartDate(firstDayOfMonth.toISOString().split('T')[0]);
        setSelectedEndDate(lastDayOfMonth.toISOString().split('T')[0]);
    };

    useEffect(() => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        setSelectedStartDate(firstDayOfMonth.toISOString().split('T')[0]);
        setSelectedEndDate(lastDayOfMonth.toISOString().split('T')[0]);
    }, []);

    return (
        <div>
            <div className='row'>
                <div className='col-sm-3'>
                    <label htmlFor="month">Tháng đã chọn:</label>
                    <input
                        type="month"
                        id="month"
                        value={selectedStartDate.substring(0, 7)}
                        className='form-control'
                        onChange={handleMonthChange}
                    />
                </div>
            </div>
            <br />
        </div>
    );
}

export default WeekSelectMonth;
