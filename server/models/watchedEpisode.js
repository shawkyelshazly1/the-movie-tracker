const mongoose = require("mongoose");

const watchedEpisodeSchema = mongoose.Schema({
	userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
	imdbId: { type: String, required: true },
	season: { type: Number, required: true },
	mediaId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Media",
		required: true,
	},
});

const WatchedEpisode = mongoose.model("WatchedEpisode", watchedEpisodeSchema);

module.exports = WatchedEpisode;
