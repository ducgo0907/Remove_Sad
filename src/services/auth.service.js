import axios from "axios";
import CONSTANT from "../utils/Iconstant";

const API_URL = `${CONSTANT.host}/users/`;

class AuthService {
	async login(loginData) {
		const response = await axios
			.post(API_URL + "login", loginData, {
				headers: {
					'Content-Type': 'application/json',
				}
			});
		if (response.data.accessToken) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	}

	logout() {
		localStorage.removeItem("user");
	}

	register(registerForm) {
		return axios.post(API_URL + "register", registerForm);
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'), {
			headers: {
				'Content-Type': 'application/json',
			}
		});
	}
}

export default new AuthService();