const router = require("express").Router(),
	authControllers = require("../controllers/auth");

// Register Route
router.post("/register", authControllers.registerController);

// login  Route
router.post("/login", authControllers.loginUserController);

// logout route
router.get("/logout", authControllers.logoutUserController);

// #TODO: Forget Password Route

module.exports = router;
