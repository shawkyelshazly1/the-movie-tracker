const router = require("express").Router(),
	authControllers = require("../controllers/auth"),
	authMiddlewares = require("../middlewares/auth");

// Register Route
router.post("/register", authControllers.registerController);

// login  Route
router.post("/login", authControllers.loginUserController);

// logout route
router.get("/logout", authControllers.logoutUserController);

// load user route
router.get("/", authMiddlewares.validateAuth, authControllers.loadCurrentUser);

// #TODO: Forget Password Route

module.exports = router;
