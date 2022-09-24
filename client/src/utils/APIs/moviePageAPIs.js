import imdbAPI from "../imdbAPI";

// get the media details api for the movie page
const getMediaDetails = async (media_type, media_id, handleAlert) => {
	return imdbAPI
		.get(`/${media_type}/${media_id}`)
		.then((res) => {
			handleAlert("", "");
			return res.data;
		})
		.catch((err) => {
			console.error(err);
			handleAlert("error", "Something Went Wrong!");
		});
};

// get media trailer
const getMediaTrailer = async (media_type, media, handleAlert) => {
	return imdbAPI
		.get(`/${media_type}/${media.id}/videos`)
		.then((res) => {
			return res.data.results;
		})
		.catch((err) => {
			console.error(err);
			handleAlert("error", "Something Went Wrong!");
		});
};

// load season episodes
const loadSeasonEpisodes = async (media_id, selectedSeason) => {
	return imdbAPI.get(`/tv/${media_id}/season/${selectedSeason}`).then((res) => {
		return res.data.episodes;
	});
};

export { getMediaDetails, loadSeasonEpisodes, getMediaTrailer };
