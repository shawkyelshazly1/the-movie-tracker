const { default: api } = require("../utils/api");
const { default: imdbAPI } = require("../utils/imdbAPI");

// load top weekly trending movies / shows
// #TODO: remove shows/movies already watched or being watched now
exports.getSuggested = async (handleAlert) => {
	return imdbAPI
		.get(`/trending/all/week`)
		.then((res) => {
			handleAlert("", "");
			return res.data.results;
		})
		.catch((err) => {
			handleAlert("error", "Something Went Wrong!");
		});
};

// get list of tracked media
exports.getTrackList = async (handleAlert) => {
	return api
		.get("/trackList/")
		.then((res) => {
			handleAlert("", "");
			return res.data.mediaList;
		})
		.catch((err) => {
			handleAlert("error", "Something Went Wrong!");
		});
};
