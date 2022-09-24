const router = require("express").Router(),
	authMiddlewares = require("../middlewares/auth"),
	watchedEpisodeController = require("../controllers/watchedEpisodeController");

// get watched episodes for a series
// will be got from pulling media from tracklist
router.get(
	"/:mediaId",
	authMiddlewares.validateAuth,
	watchedEpisodeController.getWatchedEpisodes
);

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

// add season as watched
router.post(
	"/season",
	authMiddlewares.validateAuth,
	watchedEpisodeController.addSeasonWatchedEpisode
);

// remove season as unwatched
router.delete(
	"/season",
	authMiddlewares.validateAuth,
	watchedEpisodeController.RemoveSeasonWatchedEpisode
);

module.exports = router;
