const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema(
	{
		mediaType: { type: String, enum: ["movie", "tvseries"], required: true },
		cover: { type: String, required: true },
		title: { type: String, required: true },
		imdbId: { type: String, required: true },
	},
	{ timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
