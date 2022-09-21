const authMiddlewares = require("../middlewares/auth"),
	trackedMediaController = require("../controllers/trackedMediaController");

const router = require("express").Router();

// load list of tracked media
router.get(
	"/",
	authMiddlewares.validateAuth,
	trackedMediaController.getTrackedMedia
);

// add media to tracked list
router.post(
	"/",
	authMiddlewares.validateAuth,
	trackedMediaController.trackMedia
);

// remove media from tracked list
router.delete(
	"/",
	authMiddlewares.validateAuth,
	trackedMediaController.untrackMedia
);

module.exports = router;
