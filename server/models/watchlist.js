const mongoose = require("mongoose");

const watchlistSchema = mongoose.Schema(
	{
		userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
		mediaList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Media" }],
	},
	{ timestamps: true }
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;
