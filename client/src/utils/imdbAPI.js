import axios from "axios";

export default axios.create({
	baseURL: "localhost:5000/api",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=UTF-8",
	},
});
