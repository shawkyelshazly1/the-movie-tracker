const Watchlist = require("../models/watchlist"),
	Media = require("../models/media");
const { loadMediaData } = require("../utils/helper");

// get watchlist controller
exports.getWatchlist = async (req, res, next) => {
	const { userId } = req.payload;

	const watchlist = await Watchlist.findOne({ userId });
	if (!watchlist) {
		return res.status(200).json({ media: [] });
	}

	const mediaList = await watchlist.populate("mediaList");
	return res.status(200).json({ media: mediaList });
};

// add to watchlist
exports.addToWatchList = async (req, res, next) => {
	const { userId } = req.payload;

	// search if media is saved on DB
	if (!req.body.imdbId) {
		return res.status(422).json({ error: "Missing the media imdbId." });
	}
	const imdbId = req.body.imdbId;

	let foundMedia = await Media.findOne({ imdbId });

	// add media to db if not found

	if (!foundMedia) {
		// loads Mediadata from api and adds it to DB
		foundMedia = loadMediaData(imdbId);
	}

	let watchlist = await Watchlist.findOne({ userId });
	if (!watchlist) {
		watchlist = await new Watchlist({ userId, mediaList: [foundMedia.id] });
		await watchlist.save();
	} else if (!watchlist.mediaList.includes(foundMedia.id)) {
		await Watchlist.findByIdAndUpdate(
			watchlist.id,
			{
				$push: { mediaList: foundMedia.id },
			},
			{ new: true }
		).then((watchlist) => {
			return res.status(200).json({ media: watchlist.mediaList });
		});
	} else {
		return res.status(200).json({ media: watchlist.mediaList });
	}
};

// remove from watchlist
exports.removeFromWatchList = async (req, res, next) => {
	const { userId } = req.payload;

	if (!req.body.mediaId) {
		return res.status(422).json({ error: "Missing the mediaId." });
	}

	// in case someone trying to delete show from watchlist not exist
	let watchlist = await Watchlist.findOne({ userId });
	if (!watchlist) {
		watchlist = await new Watchlist({ userId, mediaList: [] });
		await watchlist.save();
	}
	// search if media is saved on DB
	const mediaId = req.body.mediaId;
	const foundMedia = await Media.findById(mediaId);

	if (watchlist.mediaList.includes(foundMedia.id)) {
		await Watchlist.findByIdAndUpdate(
			watchlist.id,
			{
				$pull: { mediaList: foundMedia.id },
			},
			{ new: true }
		).then((watchlist) => {
			return res.status(200).json({ media: watchlist.mediaList });
		});
	} else {
		return res.status(200).json({ media: watchlist.mediaList });
	}
};
