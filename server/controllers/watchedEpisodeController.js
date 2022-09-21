const WatchedEpisode = require("../models/watchedEpisode");

// load series watched episodes
exports.getWatchedEpisodes = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId } = req.body;

	if (!mediaId) {
		return res.status(422).json({ message: "Media id is required." });
	}

	try {
		const watchedEpisodes = await WatchedEpisode.find({
			$and: [{ userId }, { mediaId }],
		});
		return res.status(200).json({ watchedEpisodes });
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// add series watched episodes
exports.addWatchedEpisode = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId, imdbId, season } = req.body;

	if (!mediaId || !season || !imdbId) {
		return res
			.status(422)
			.json({ message: "Media id, imdb id and season number are required." });
	}

	try {
		const watchedEpisode = await WatchedEpisode.findOne({
			$and: [{ userId }, { imdbId }],
		});

		if (watchedEpisode) {
			return res.status(200).json({ message: "Already watched" });
		} else {
			const watchedEpisode = await new WatchedEpisode({
				userId,
				mediaId,
				imdbId,
				season,
			});

			await watchedEpisode.save();

			return res.status(200).json({ watchedEpisode });
		}
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// remove sereis watched episodes
exports.removeWatchedEpisode = async (req, res, next) => {
	const { userId } = req.payload;
	const { imdbId } = req.body;

	if (!imdbId) {
		return res.status(422).json({ message: "Imdb id is required." });
	}

	try {
		const watchedEpisode = await WatchedEpisode.findOne({
			$and: [{ userId }, { imdbId }],
		});

		if (!watchedEpisode) {
			return res.status(200).json({ message: "Episode not watched already!" });
		} else {
			await watchedEpisode.deleteOne();
			return res
				.status(200)
				.json({ message: "Episode removed from watched list." });
		}
	} catch (error) {
		return res.status(500).json({ error });
	}
};
