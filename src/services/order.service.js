import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_BASE_URL}order/`;

class OrderService {
	createPaymentUrl(formData) {
		return axios.post(`${API_URL}create_payment_url`, formData, { headers: authHeader() })
	}
}

// 
export default new OrderService();