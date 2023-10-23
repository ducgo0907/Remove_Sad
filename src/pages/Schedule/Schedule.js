import moment from 'moment/moment';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import scheduleService from '../../services/schedule.service';

function Schedule({ user }) {
	const [selectedFromDate, setSelectedFromDate] = useState(null);
	const [selectedToDate, setSelectedToDate] = useState(null);
	const handleFromDateChange = (date) => {
		setSelectedFromDate(date);
	};

	const handleToDateChange = (date) => {
		setSelectedToDate(date);
	};

	// Function to restrict selectable hours and minutes
	const filterPassedTime = (time) => {
		const currentTime = moment();
		const selectedTime = moment(time);
		return selectedTime.isSameOrAfter(currentTime, 'hour');
	};

	const schedule = () => {
		if (selectedFromDate <= selectedToDate) {
			console.log("Less than");
		} else {
			console.log("Greater than");
		}
		const schedule = {
			timeStart: selectedFromDate.toISOString(),
			timeEnd: selectedToDate.toISOString(),
			customerId: user.id
		}
		console.log(schedule);
		scheduleService.schedule(schedule)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			})
	}
	return (
		<div>
			<h1>Date and Time Range Picker</h1>
			<div>
				<label>From:</label>
				<DatePicker
					selected={selectedFromDate}
					onChange={handleFromDateChange}
					showTimeSelect
					dateFormat="MMMM d, yyyy h:mm aa"
					minTime={moment().startOf('day').toDate()}
					maxTime={moment().endOf('day').toDate()}
					filterTime={filterPassedTime}
					placeholderText="Select start date and time"
					timeIntervals={5}
				/>
			</div>
			<div>
				<label>To:</label>
				<DatePicker
					selected={selectedToDate}
					onChange={handleToDateChange}
					showTimeSelect
					dateFormat="MMMM d, yyyy h:mm aa"
					minTime={selectedFromDate ? moment(selectedFromDate).toDate() : moment().startOf('day').toDate()}
					maxTime={moment().endOf('day').toDate()}
					filterTime={filterPassedTime}
					placeholderText="Select end time"
					timeIntervals={5}
				/>
			</div>
			<div className="row-span-6 p-3">
				<button className="rounded-full bg-sky-500" onClick={schedule} type="submit">
					Schedule
				</button>
			</div>
		</div>
	);
}

export default Schedule;