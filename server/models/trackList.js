const mongoose = require("mongoose");

const trackListSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: true,
		},
		mediaList: [
			{
				mediaId: { type: String },
				mediaCover: { type: String },
				watched: { type: Boolean },
				watching: { type: Boolean },
				episodes: [{ type: String }],
			},
		],
	},
	{ timestamps: true }
);

const TrackList = mongoose.model("TrackList", trackListSchema);

module.exports = TrackList;
