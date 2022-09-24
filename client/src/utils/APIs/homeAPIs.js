import imdbAPI from "../imdbAPI";
import api from "../api";

// load top weekly trending movies / shows
// #TODO: remove shows/movies already watched or being watched now
const getSuggested = async (handleAlert) => {
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
const getTrackList = async (handleAlert) => {
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

const searchTMDB = async (handleAlert, searchKeyword) => {
	return imdbAPI
		.get(`/search/multi?query=${searchKeyword}`)
		.then((res) => {
			handleAlert("", "");
			return res.data.results.filter(
				(media) => media.media_type === "tv" || media.media_type === "movie"
			);
		})
		.catch((err) => {
			handleAlert("error", "Something Went Wrong!");
		});
};

export { getSuggested, getTrackList, searchTMDB };
