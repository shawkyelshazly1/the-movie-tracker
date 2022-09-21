const mongoose = require("mongoose");

// define user schema
const userSchema = mongoose.Schema(
	{
		username: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true },
		password: { type: String, required: true, trim: true },
	},
	{ timestamps: true }
);

// creating user model
const User = mongoose.model("User", userSchema);

//exporting user model
module.exports = User;
