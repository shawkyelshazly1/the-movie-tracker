const jwt = require("jsonwebtoken");
const axiosInstance = require("../utils/axios");

// extracts fields from Ajv validation error messages
const extractErrors = (validationErrors) => {
	return validationErrors.map(selectProps("instancePath", "message"));
};

// genereate refreshToken
const generateRefreshToken = async (user) => {
	const token = jwt.sign(
		{ userId: user.id },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: "1d",
		}
	);
	return token;
};

// generate access token
const generateAccessToken = async (user) => {
	const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
		// #FIXME: change the expiry time for production
		expiresIn: "1d",
	});

	return token;
};

//send refresh token
const sendRefreshToken = async (res, token) => {
	res.cookie("jid", token, {
		httpOnly: true,
	});
};

// helper
const selectProps = (...props) => {
	return function (obj) {
		const newObject = {};
		props.forEach((name) => {
			newObject[name] = obj[name];
		});
		return newObject;
	};
};



module.exports = {
	extractErrors,
	generateRefreshToken,
	generateAccessToken,
	sendRefreshToken,

};
