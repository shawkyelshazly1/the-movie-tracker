const mongoose = require("mongoose");

const watchlistSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User",
			required: true,
		},
		mediaList: [{ mediaId: { type: String }, mediaCover: { type: String } }],
	},
	{ timestamps: true }
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
