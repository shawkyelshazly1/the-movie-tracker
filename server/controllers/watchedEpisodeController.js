const TrackList = require("../models/trackList");

// add series watched episodes
exports.addWatchedEpisode = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId, episodeId } = req.body;

	if (!mediaId || !episodeId) {
		return res
			.status(422)
			.json({ message: "Media id, episode id are required." });
	}

	try {
		// find if media tracked by user already or not
		const tracklist = await TrackList.findOne({ userId });

		// check if media already added in tracklist
		if (tracklist.mediaList.some((media) => media.mediaId === mediaId)) {
			// validate if episode already added to the list of media episodes
			const watchedEpisodes = tracklist.mediaList.filter(
				(media) => media.mediaId === mediaId
			)[0].episodes;

			if (watchedEpisodes.includes(episodeId)) {
				return res.status(200).json({ episodes: watchedEpisodes });
			} else {
				await TrackList.findOneAndUpdate(
					{
						_id: tracklist.id,
						"mediaList.mediaId": mediaId,
					},
					{
						$push: { "mediaList.$.episodes": episodeId },
					}
				).then((tracklist) => {
					return res
						.status(200)
						.json({ episodes: [...watchedEpisodes, episodeId] });
				});
			}
		} else {
			return res.status(500).json({ error: "Something went wrong!" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

// remove sereis watched episodes
exports.removeWatchedEpisode = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId, episodeId } = req.body;

	if (!mediaId || !episodeId) {
		return res
			.status(422)
			.json({ message: "media id & episode id are required." });
	}

	try {
		// find if media tracked by user already or not
		const tracklist = await TrackList.findOne({ userId });

		// check if media already added in tracklist
		if (tracklist.mediaList.some((media) => media.mediaId === mediaId)) {
			// validate if episode already added to the list of media episodes
			const watchedEpisodes = tracklist.mediaList.filter(
				(media) => media.mediaId === mediaId
			)[0].episodes;

			if (!watchedEpisodes.includes(episodeId)) {
				return res.status(200).json({ episodes: watchedEpisodes });
			} else {
				await TrackList.findOneAndUpdate(
					{
						_id: tracklist.id,
						"mediaList.mediaId": mediaId,
					},
					{
						$pull: { "mediaList.$.episodes": episodeId },
					}
				).then((tracklist) => {
					const episodes = [...watchedEpisodes].filter(
						(episode) => episode !== episodeId
					);
					return res.status(200).json({ episodes });
				});
			}
		} else {
			return res.status(500).json({ error: "Something went wrong!" });
		}
	} catch (error) {
		return res.status(500).json({ error });
	}
};
