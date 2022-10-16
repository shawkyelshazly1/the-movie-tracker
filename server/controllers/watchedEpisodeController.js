const TrackList = require("../models/trackList");

// add series watched episodes
exports.addWatchedEpisode = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId, episodeId, media } = req.body;

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
		} else if (media) {
			await addMediaToTrackList(mediaId, media.poster_path, "tv", userId);
			const tracklist = await TrackList.findOne({ userId });
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

// load watched season episode
exports.getWatchedEpisodes = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId } = req.params;

	if (!mediaId) {
		return res.status(422).json({ message: "media id is required." });
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

			if (watchedEpisodes) {
				return res.status(200).json({ watchedEpisodes });
			} else {
				return res.status(200).json({ watchedEpisodes: [] });
			}
		} else {
			return res.status(200).json({ watchedEpisodes: [] });
		}
	} catch (error) {
		return res.status(500).json({ error });
	}
};

// mark all season episodes as watched
exports.addSeasonWatchedEpisode = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId, episodes, media } = req.body;
	if (!mediaId || !episodes) {
		return res
			.status(422)
			.json({ message: "Media id, episodes' ids are required." });
	}

	try {
		// find if media tracked by user already or not
		const tracklist = await TrackList.findOne({ userId });

		// check if media already added in tracklist
		if (tracklist.mediaList.some((media) => media.mediaId === mediaId)) {
			// validate if any episode already added to the list of media watched episodes

			const foundWatched = tracklist.mediaList
				.filter((media) => media.mediaId === mediaId)[0]
				.episodes.some((episode) => episodes.includes(episode));

			if (foundWatched) {
				// get media watched episodes
				const watchedEpisodes = tracklist.mediaList.filter(
					(media) => media.mediaId === mediaId
				)[0].episodes;
				// filter the unwatched episodes from the list sent by the frontend
				const unwatchedEpisodes = episodes.filter(
					(episode) => !watchedEpisodes.includes(episode)
				);

				await TrackList.findOneAndUpdate(
					{
						_id: tracklist.id,
						"mediaList.mediaId": mediaId,
					},
					{
						$push: { "mediaList.$.episodes": { $each: unwatchedEpisodes } },
					},
					{ new: true }
				).then((tracklist) => {
					return res.status(200).json({
						episodes: tracklist.mediaList.filter(
							(media) => media.mediaId === mediaId
						)[0].episodes,
					});
				});
			} else {
				await TrackList.findOneAndUpdate(
					{
						_id: tracklist.id,
						"mediaList.mediaId": mediaId,
					},
					{
						$push: { "mediaList.$.episodes": { $each: episodes } },
					},
					{ new: true }
				).then((tracklist) => {
					return res.status(200).json({
						episodes: tracklist.mediaList.filter(
							(media) => media.mediaId === mediaId
						)[0].episodes,
					});
				});
			}
		} else {
			await addMediaToTrackList(mediaId, media.poster_path, "tv", userId);
			const tracklist = await TrackList.findOne({ userId });
			const foundWatched = tracklist.mediaList
				.filter((media) => media.mediaId === mediaId)[0]
				.episodes.some((episode) => episodes.includes(episode));

			if (foundWatched) {
				// get media watched episodes
				const watchedEpisodes = tracklist.mediaList.filter(
					(media) => media.mediaId === mediaId
				)[0].episodes;
				// filter the unwatched episodes from the list sent by the frontend
				const unwatchedEpisodes = episodes.filter(
					(episode) => !watchedEpisodes.includes(episode)
				);

				await TrackList.findOneAndUpdate(
					{
						_id: tracklist.id,
						"mediaList.mediaId": mediaId,
					},
					{
						$push: { "mediaList.$.episodes": { $each: unwatchedEpisodes } },
					},
					{ new: true }
				).then((tracklist) => {
					return res.status(200).json({
						episodes: tracklist.mediaList.filter(
							(media) => media.mediaId === mediaId
						)[0].episodes,
					});
				});
			} else {
				await TrackList.findOneAndUpdate(
					{
						_id: tracklist.id,
						"mediaList.mediaId": mediaId,
					},
					{
						$push: { "mediaList.$.episodes": { $each: episodes } },
					},
					{ new: true }
				).then((tracklist) => {
					return res.status(200).json({
						episodes: tracklist.mediaList.filter(
							(media) => media.mediaId === mediaId
						)[0].episodes,
					});
				});
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

//remove all season episodes from watched episodes
exports.RemoveSeasonWatchedEpisode = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId, episodes } = req.body;
	if (!mediaId || !episodes) {
		return res
			.status(422)
			.json({ message: "Media id, episodes' ids are required." });
	}

	try {
		// find if media tracked by user already or not
		const tracklist = await TrackList.findOne({ userId });

		// check if media already added in tracklist
		if (tracklist.mediaList.some((media) => media.mediaId === mediaId)) {
			// validate if any episode already added to the list of media watched episodes

			const foundWatched = tracklist.mediaList
				.filter((media) => media.mediaId === mediaId)[0]
				.episodes.some((episode) => episodes.includes(episode));

			if (foundWatched) {
				// get media watched episodes
				const watchedEpisodes = tracklist.mediaList.filter(
					(media) => media.mediaId === mediaId
				)[0].episodes;
				// filter the unwatched episodes from the list sent by the frontend
				const watchedSeasonEpisodes = episodes.filter((episode) =>
					watchedEpisodes.includes(episode)
				);

				await TrackList.findOneAndUpdate(
					{
						_id: tracklist.id,
						"mediaList.mediaId": mediaId,
					},
					{
						$pullAll: { "mediaList.$.episodes": watchedSeasonEpisodes },
					},
					{ new: true }
				).then((tracklist) => {
					return res.status(200).json({
						episodes: tracklist.mediaList.filter(
							(media) => media.mediaId === mediaId
						)[0].episodes,
					});
				});
			} else {
				return res.status(200).json({
					episodes: tracklist.mediaList.filter(
						(media) => media.mediaId === mediaId
					)[0].episodes,
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

// add media to tracked list on adding watched episode
const addMediaToTrackList = async (
	mediaId,
	mediaCover,
	mediaType,
	userId,
	watched
) => {
	if (!mediaId || !mediaCover || !mediaType) {
		return res
			.status(422)
			.json({ error: "Missing the mediaId, media type or mediaCover." });
	}

	const trackList = await TrackList.findOne({ userId });
	if (!trackList) {
		let newTrackList = null;
		if (watched) {
			newTrackList = await new TrackList({
				userId,
				mediaList: [{ mediaId, mediaCover, mediaType, watched }],
			});
		} else {
			newTrackList = await new TrackList({
				userId,
				mediaList: [{ mediaId, mediaCover, mediaType }],
			});
		}

		await newTrackList.save();
		return newTrackList;
	} else {
		if (
			trackList.mediaList.some(
				(media) => media.mediaId === mediaId && media.mediaType === mediaType
			)
		) {
			return trackList;
		} else {
			if (watched) {
				await TrackList.findByIdAndUpdate(
					trackList.id,
					{
						$push: { mediaList: { mediaId, mediaCover, mediaType, watched } },
					},
					{ new: true }
				).then((trackList) => {
					return trackList;
				});
			} else {
				await TrackList.findByIdAndUpdate(
					trackList.id,
					{
						$push: { mediaList: { mediaId, mediaCover, mediaType } },
					},
					{ new: true }
				).then((trackList) => {
					return trackList;
				});
			}
		}
	}
};
