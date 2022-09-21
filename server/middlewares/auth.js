const jwt = require("jsonwebtoken"),
	consola = require("consola");

// validate access token middleware to ensure authenticated
exports.validateAuth = async (req, res, next) => {
	// validate authorization part of the headers
	const authorization = req.headers["authorization"];
	if (!authorization) {
		return res.status(401).json({ error: "Not Authenticated" });
	}

	try {
		// verify the access token from the header & add userId to payload if valid
		const accessToken = authorization.split(" ")[1];
		const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		req.payload = payload;
		next();
	} catch (error) {
		consola.error(error);
		return res.status(401).json({ error: "Not Authenticated" });
	}
};
