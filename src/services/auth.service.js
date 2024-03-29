import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_BASE_URL}users/`;

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
		localStorage.clear();
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

	getCurrentMoney() {
		return JSON.parse(localStorage.getItem('money'));
	}

	getMoney() {
		return axios.get(API_URL + "money", { headers: authHeader() });
	}

	goToChat(param) {
		return axios.post(API_URL + "goToChat", param, { headers: authHeader() });
	}

	checkExistedChat(param) {
		return axios.post(API_URL + "checkExsitedChat", param, { headers: authHeader() });
	}

	genGuest(){
		return axios.post(API_URL + "genGuest", {}, {headers: authHeader()});
	}
}

export default new AuthService();