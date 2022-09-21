const express = require("express"),
	mongoose = require("mongoose"),
	consola = require("consola"),
	bodyParser = require("body-parser");

// setting env variables
require("dotenv").config();

// init express app
const app = express();

// middlewares
app.use(bodyParser.json());

// server starting function
const startServer = async () => {
	// connecting mongodb
	mongoose
		.connect(process.env.MONGODBURI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => {
			// showing success connection and starting server
			consola.success("🚀 MongoDB Connected!");
			app.listen(process.env.PORT, () => {
				consola.success(
					"🚀 Server running on port 5000 can visit here: " +
						"http://localhost:5000"
				);
			});
		})
		.catch((err) => {
			// showing error on mongodb connection and stop server
			consola.error("🐞 " + new Error(err));
			consola.error(`🐞 Server not started`);
		});
};

// import routes
const authRouter = require("./routes/auth"),
	watchlistRouter = require("./routes/watchlist"),
	trackedMediaRouter = require("./routes/trackedMedia"),
	watchedEpisodeRouter = require("./routes/watchedEpisode");

// register routes
app.use("/api/auth", authRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/api/trackedMedia", trackedMediaRouter);
app.use("/api/watchedEpisode", watchedEpisodeRouter);

// starting server
startServer();
