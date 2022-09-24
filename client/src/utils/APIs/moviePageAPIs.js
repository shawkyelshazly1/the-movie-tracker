import imdbAPI from "../imdbAPI";
import api from "../api";
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
const loadSeasonEpisodes = async (media_id, selectedSeason, handleAlert) => {
	return imdbAPI
		.get(`/tv/${media_id}/season/${selectedSeason}`)
		.then((res) => {
			return res.data.episodes;
		})
		.catch((err) => {
			console.error(err);
			handleAlert("error", "Something Went Wrong!");
		});
};

// load  watched episodes
const loadWatchedEpisodes = async (mediaId, handleAlert) => {
	return api
		.get(`/watchedEpisode/${mediaId}`)
		.then((res) => {
			return res.data.watchedEpisodes;
		})
		.catch((err) => {
			console.error(err);
			handleAlert("error", "Something Went Wrong!");
		});
};

// mark episode as watched or not watched
const markEpisodeWatchedOrNot = async (
	mediaId,
	episodeId,
	handleAlert,
	watched
) => {
	let data = { episodeId: String(episodeId), mediaId: String(mediaId) };
	return watched
		? api
				.delete("/watchedEpisode/", { data })
				.then((res) => {
					return res.data.episodes;
				})
				.catch((err) => {
					console.error(err);
					handleAlert("error", ["Something Went Wrong!"]);
				})
		: api
				.post("/watchedEpisode/", data)
				.then((res) => {
					return res.data.episodes;
				})
				.catch((err) => {
					console.error(err);
					handleAlert("error", ["Something Went Wrong!"]);
				});
};

// mark season as watched or not
const markSeasonWatchedOrNot = async (
	mediaId,
	episodes,
	watched,
	handleAlert
) => {
	let data = { mediaId: String(mediaId), episodes };
	console.log(data);
	return watched
		? api
				.delete("/watchedEpisode/season", { data })
				.then((res) => {
					return res.data.episodes;
				})
				.catch((err) => {
					console.error(err);
					handleAlert("error", ["Something Went Wrong!"]);
				})
		: api
				.post("/watchedEpisode/season", data)
				.then((res) => {
					return res.data.episodes;
				})
				.catch((err) => {
					console.error(err);
					handleAlert("error", ["Something Went Wrong!"]);
				});
};

export {
	getMediaDetails,
	loadSeasonEpisodes,
	getMediaTrailer,
	loadWatchedEpisodes,
	markEpisodeWatchedOrNot,
	markSeasonWatchedOrNot,
};
