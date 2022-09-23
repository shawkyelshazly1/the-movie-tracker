const authMiddlewares = require("../middlewares/auth"),
	trackListController = require("../controllers/trackListController");

const router = require("express").Router();

// load list of tracked media
router.get("/", authMiddlewares.validateAuth, trackListController.getTrackList);

// add media to tracked list
router.post(
	"/",
	authMiddlewares.validateAuth,
	trackListController.addToTrackList
);

// remove media from tracked list
router.delete(
	"/",
	authMiddlewares.validateAuth,
	trackListController.removeFromTrackList
);

module.exports = router;
