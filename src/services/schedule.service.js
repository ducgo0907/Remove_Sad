import axios from "axios";
import CONSTANT from "../utils/Iconstant";
import authHeader from "./auth-header";

const API_URL = `${CONSTANT.host}schedule/`;

class ScheduleService {
	schedule(schedule) {
		console.log(schedule);
		return axios.post(API_URL + 'schedule', schedule, { headers: authHeader() })
	}
}

export default new ScheduleService();
