const router = require("express").Router(),
	authMiddlewares = require("../middlewares/auth"),
	watchedEpisodeController = require("../controllers/watchedEpisodeController");

// get watched episodes for a series
// will be got from pulling media from tracklist

// add watched episode
router.post(
	"/",
	authMiddlewares.validateAuth,
	watchedEpisodeController.addWatchedEpisode
);

// remove watched episode
router.delete(
	"/",
	authMiddlewares.validateAuth,
	watchedEpisodeController.removeWatchedEpisode
);

module.exports = router;
