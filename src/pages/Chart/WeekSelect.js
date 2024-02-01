import React, { useEffect, useState } from 'react';
import './week-select.css'
function WeekSelect({ selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate }) {
    const handleStartDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const monday = getMonday(selectedDate);
        const sunday = getSunday(selectedDate);

        setSelectedStartDate(monday.toISOString().split('T')[0]);
        setSelectedEndDate(sunday.toISOString().split('T')[0]);
    };


    useEffect(() => {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Adjust when day is Sunday
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        setSelectedStartDate(monday.toISOString().split('T')[0]);
        setSelectedEndDate(sunday.toISOString().split('T')[0]);
    }, []);

    const handleEndDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const monday = getMonday(selectedDate);
        const sunday = getSunday(selectedDate);

        setSelectedStartDate(monday.toISOString().split('T')[0]);
        setSelectedEndDate(sunday.toISOString().split('T')[0]);
    };

    const getMonday = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(date.setDate(diff));
    };

    const getSunday = (date) => {
        const day = date.getDay();
        const diff = date.getDate() + (day === 0 ? 0 : 7 - day); // Adjust when day is not Sunday
        return new Date(date.setDate(diff));
    };

    return (
        <div>
            <div className='row'>
                <div className='col-sm-3'>
                    <label htmlFor="start-date">Ngày bắt đầu:</label>
                    <input
                        type="date"
                        id="start-date"
                        value={selectedStartDate}
                        className='form-control'
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className='col-sm-3'>
                    <label htmlFor="end-date">Ngày kết thúc:</label>
                    <input
                        type="date"
                        id="end-date"
                        value={selectedEndDate}
                        onChange={handleEndDateChange}
                        className='form-control'
                    />
                </div>
            </div>

            <br />
        </div>
    );
}

export default WeekSelect;
