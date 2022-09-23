const router = require("express").Router(),
	watchlistController = require("../controllers/watchlistController"),
	authMiddlewares = require("../middlewares/auth");

// load watchlist
router.get("/", authMiddlewares.validateAuth, watchlistController.getWatchlist);

// add to watchlist
router.post(
	"/",
	authMiddlewares.validateAuth,
	watchlistController.addToWatchList
);

// remove from watchlist
router.delete(
	"/",
	authMiddlewares.validateAuth,
	watchlistController.removeFromWatchList
);

module.exports = router;
