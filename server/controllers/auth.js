const {
		validateUserRegister,
		validateUserLogin,
	} = require("../ajvValidators/validation"),
	consola = require("consola"),
	{
		extractErrors,
		generateAccessToken,
		sendRefreshToken,
		generateRefreshToken,
	} = require("../utils/helper"),
	User = require("../models/user"),
	bcryptjs = require("bcryptjs");

// register user controller
exports.registerController = async (req, res, next) => {
	// validate data with ajv
	const validData = validateUserRegister(req.body);

	if (validData) {
		// checking if user registered already or username is taken
		const user = await User.findOne({
			$or: [{ email: req.body.email }, { username: req.body.username }],
		});

		if (user) {
			return res
				.status(409)
				.json({ error: "Username is taken or email is registered already." });
		}

		const { confirmPassword, ...userData } = req.body;

		// hashing password for the user
		userData.password = await bcryptjs.hashSync(req.body.password, 10);

		// creating new user in DB
		const newUser = await new User(userData);

		await newUser.save();

		return res.status(200).json({ message: "User created." });
	} else {
		let errors = extractErrors(validateUserRegister.errors);
		return res.status(409).json({ errors });
	}
};

// login user Controller
exports.loginUserController = async (req, res, next) => {
	const validData = validateUserLogin(req.body);

	if (validData) {
		const user = await User.findOne({ username: req.body.username });

		if (!user) {
			return res.status(403).json({ error: "Incorrect username or password." });
		}

		await sendRefreshToken(res, await generateRefreshToken(user));
		return res
			.status(200)
			.json({ accessToken: await generateAccessToken(user), user });
	} else {
		let errors = extractErrors(validateUserLogin.errors);
		return res.status(409).json({ errors });
	}
};

// logout user Controller
exports.logoutUserController = async (req, res, next) => {
	await sendRefreshToken(res, "");
	return res.status(200).json({ accessToken: "" });
};
