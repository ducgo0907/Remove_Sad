import axios from "axios";
import authHeader from "./auth-header";
import CONSTANT from "../utils/Iconstant";

const API_URL = `${CONSTANT.host}/messages/`;

class MessageService {
	getListUser(adminMail) {
		return axios.get(API_URL + 'listUser', {
			headers: authHeader(),
			params: {
				adminID: adminMail
			}
		})
	}

	getAllMessage({ receiver, sender }) {
		return axios.get(API_URL + 'all', {
			headers: authHeader(),
			params: {
				receiver,
				sender
			}
		})
	}

	getListPilyr() {
		return axios.get(API_URL + 'getPylir', {
			headers: authHeader()
		})
	}
}

export default new MessageService();