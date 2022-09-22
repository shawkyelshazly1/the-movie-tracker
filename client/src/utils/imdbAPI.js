import axios from "axios";

export default axios.create({
	baseURL: "https://imdb-api.com/en/API",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=UTF-8",
	},
});
