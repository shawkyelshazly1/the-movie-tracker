const Media = require("../models/media");
const TrackedMedia = require("../models/trackedMedia"),
	consola = require("consola"),
	{ loadMediaData } = require("../utils/helper");

// loads list of tracked Media
exports.getTrackedMedia = async (req, res, next) => {
	const { userId } = req.payload;

	try {
		// search for media tracked by user ID
		const trackedMediaList = await TrackedMedia.find({ userId }).populate(
			"mediaId"
		);
		// return list of tracked media populating the media field with details from media collection
		return res.status(200).json({ media: trackedMediaList });
	} catch (error) {
		consola.error(error);
		return res.status(500).json({ error });
	}
};

// adds media to tracked list
exports.trackMedia = async (req, res, next) => {
	const { userId } = req.payload;
	const imdbId = req.body.imdbId;

	if (!imdbId) {
		return res.status(422).json({ error: "Missing the media imdbId." });
	}

	// search for Media by imdbid
	let foundMedia = await Media.findOne({ imdbId });
	// add media to db if not found
	if (!foundMedia) {
		// loads Mediadata from api and adds it to DB
		foundMedia = await loadMediaData(imdbId);
	}

	// search if media is already tracked by userID & mediaId
	const alreadyTracked = await TrackedMedia.findOne({
		$and: [{ userId }, { mediaId: foundMedia.id }],
	});


	if (alreadyTracked) {
		return res.status(200).json({ media: foundMedia });
	} else {
		try {
			// create new tracked media in DB and send media back to user
			const newTrackedMedia = await new TrackedMedia({
				userId,
				mediaId: foundMedia.id,
			});
			await newTrackedMedia.save();

			return res.status(200).json({ media: newTrackedMedia });
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
};

// removes media from tracked list
exports.untrackMedia = async (req, res, next) => {
	const { userId } = req.payload;
	const mediaId = req.body.mediaId;

	if (!mediaId) {
		return res.status(422).json({ error: "Missing the media Id." });
	}

	// search for tracked media by userId & mediaID
	const trackedMedia = await TrackedMedia.findOne({
		$and: [{ userId }, { mediaId }],
	});

	if (!trackedMedia) {
		return res.status(200).json({ message: "Media not tracked!" });
	} else {
		try {
			// deletes media tracking from DB
			// #TODO: deletes tracking episodes as well
			await trackedMedia.deleteOne();

			return res.status(200).json({ message: "Media un tracked." });
		} catch (error) {
			return res.status(500).json({ error });
		}
	}
};
