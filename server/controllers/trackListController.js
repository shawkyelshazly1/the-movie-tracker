const consola = require("consola");
const TrackList = require("../models/trackList");
const Watchlist = require("../models/watchlist");

// loads list of tracked Media
exports.getTrackList = async (req, res, next) => {
	const { userId } = req.payload;
	try {
		// search for media tracked by user ID
		const trackList = await TrackList.findOne({ userId });

		if (trackList) {
			return res.status(200).json({ mediaList: trackList.mediaList });
		} else {
			return res.status(200).json({ mediaList: [] });
		}
	} catch (error) {
		consola.error(error);
		return res.status(500).json({ error });
	}
};

// adds media to tracked list
exports.addToTrackList = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId, mediaCover, mediaType } = req.body;

	if (!mediaId || !mediaCover || !mediaType) {
		return res
			.status(422)
			.json({ error: "Missing the mediaId, media type or mediaCover." });
	}

	const trackList = await TrackList.findOne({ userId });
	if (!trackList) {
		const newTrackList = await new TrackList({
			userId,
			mediaList: [{ mediaId, mediaCover, mediaType }],
		});
		await newTrackList.save();
		return res.status(200).json({ mediaList: newTrackList.mediaList });
	} else {
		if (
			trackList.mediaList.some(
				(media) => media.mediaId === mediaId && media.mediaType === mediaType
			)
		) {
			return res.status(200).json({ mediaList: trackList.mediaList });
		} else {
			await TrackList.findByIdAndUpdate(
				trackList.id,
				{
					$push: { mediaList: { mediaId, mediaCover, mediaType } },
				},
				{ new: true }
			).then((trackList) => {
				removeFromWatchList(userId, mediaId);
				return res.status(200).json({ mediaList: trackList.mediaList });
			});
		}
	}
};

// removes media from tracked list
exports.removeFromTrackList = async (req, res, next) => {
	const { userId } = req.payload;
	const { mediaId, mediaType } = req.body;

	if (!mediaId || !mediaType) {
		return res
			.status(422)
			.json({ error: "Missing the media Id or media type." });
	}

	const userTrackList = await TrackList.findOne({ userId });

	if (!userTrackList) {
		return res.status(422).json({ error: "Something went wrong!" });
	}

	if (
		userTrackList.mediaList.some(
			(media) => media.mediaId === mediaId && media.mediaType === mediaType
		)
	) {
		await TrackList.findByIdAndUpdate(
			userTrackList.id,
			{
				$pull: { mediaList: { mediaId } },
			},
			{ new: true }
		).then((trackList) => {
			return res.status(200).json({ mediaList: trackList.mediaList });
		});
	} else {
		return res.status(200).json({ message: "Media not tracked already." });
	}
};

// Helper:: remove tracked media from watchlist if exists
const removeFromWatchList = async (userId, mediaId) => {
	const userWatchlist = await Watchlist.findOne({ userId });

	if (
		userWatchlist &&
		userWatchlist.mediaList.some((media) => media.mediaId === mediaId)
	) {
		await Watchlist.findByIdAndUpdate(userWatchlist.id, {
			$pull: { mediaList: { mediaId } },
		});
	}
};
