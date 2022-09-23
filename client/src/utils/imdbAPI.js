import axios from "axios";

export default axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json; charset=UTF-8",
		authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
	},
});
