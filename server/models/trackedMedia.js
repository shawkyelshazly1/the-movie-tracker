const mongoose = require("mongoose");

const trackedMediaSchema = mongoose.Schema({
	userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
	mediaId: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Media",
		required: true,
	},
	watched: { type: Boolean, default: false },
});

const TrackedMedia = mongoose.model("TrackedMedia", trackedMediaSchema);

module.exports = TrackedMedia;
