const router = require("express").Router(),
	wathclistController = require("../controllers/watchlist"),
	authMiddlewares = require("../middlewares/auth");

// load watchlist
router.get("/", authMiddlewares.validateAuth, wathclistController.getWatchlist);

// add to watchlist
router.post(
	"/",
	authMiddlewares.validateAuth,
	wathclistController.addToWatchList
);

// remove from watchlist
router.delete(
	"/",
	authMiddlewares.validateAuth,
	wathclistController.removeFromWatchList
);

module.exports = router;
