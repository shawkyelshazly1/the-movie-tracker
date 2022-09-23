const Watchlist = require("../models/watchlist");

// get watchlist controller
exports.getWatchlist = async (req, res, next) => {
	const { userId } = req.payload;

	const watchlist = await Watchlist.findOne({ userId });
	if (!watchlist) {
		return res.status(200).json({ mediaList: [] });
	}

	return res.status(200).json({ mediaList: watchlist.mediaList });
};

// add to watchlist
exports.addToWatchList = async (req, res, next) => {
	const { userId } = req.payload;

	// search if media is saved on DB
	if (!req.body.mediaId || !req.body.mediaCover) {
		return res.status(422).json({ error: "Missing the media id or cover." });
	}
	const { mediaId, mediaCover } = req.body;

	// add media to db if not fo
	let watchlist = await Watchlist.findOne({ userId });
	if (!watchlist) {
		watchlist = await new Watchlist({
			userId,
			mediaList: [{ mediaId, mediaCover }],
		});
		await watchlist.save();
		return res.status(200).json({ media: watchlist.mediaList });
	} else if (!watchlist.mediaList.some((media) => media.mediaId === mediaId)) {
		await Watchlist.findByIdAndUpdate(
			watchlist.id,
			{
				$push: { mediaList: { mediaId, mediaCover } },
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
		return res.status(422).json({ error: "Missing the media id or cover." });
	}
	const { mediaId } = req.body;

	// in case someone trying to delete show from watchlist not exist
	let watchlist = await Watchlist.findOne({ userId });
	if (!watchlist) {
		watchlist = await new Watchlist({ userId, mediaList: [] });
		await watchlist.save();
	}

	if (watchlist.mediaList.some((media) => media.mediaId === mediaId)) {
		await Watchlist.findByIdAndUpdate(
			watchlist.id,
			{
				$pull: { mediaList: { mediaId } },
			},
			{ new: true }
		).then((watchlist) => {
			return res.status(200).json({ mediaList: watchlist.mediaList });
		});
	} else {
		return res.status(200).json({ mediaList: watchlist.mediaList });
	}
};
