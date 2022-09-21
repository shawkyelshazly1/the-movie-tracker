const axios = require("axios");

const axiosInstance = axios.create({
	baseURL: "https://imdb-api.com/en/API",
});

module.exports = axiosInstance;
