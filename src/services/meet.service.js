import axios from "axios";
import CONSTANT from "../utils/Iconstant";
import authHeader from "./auth-header";

const API_URL = `${CONSTANT.host}meet/`;

class ScheduleService {
    createMeet(meet) {
        return axios.post(API_URL + 'create', meet, { headers: authHeader() })
    }

    getHistory() {
        return axios.get(API_URL + 'get-by-user', { headers: authHeader() })
    }

    getAll() {
        return axios.get(API_URL + 'get-all', { headers: authHeader() });
    }

    approve(object) {
        return axios.post(API_URL + "approve", object, { headers: authHeader() })
    }
}

export default new ScheduleService();
