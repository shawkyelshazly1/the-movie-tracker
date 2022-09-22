const {
		validateUserRegister,
		validateUserLogin,
	} = require("../ajvValidators/validation"),
	User = require("../models/user"),
	consola = require("consola"),
	{
		extractErrors,
		generateAccessToken,
		sendRefreshToken,
		generateRefreshToken,
	} = require("../utils/helper"),
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
				.status(422)
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
		return res.status(422).json({ errors });
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

		if (!(await bcryptjs.compare(req.body.password, user.password))) {
			return res.status(403).json({ error: "Incorrect password." });
		}
		const { password, ...returnedUser } = user._doc;

		await sendRefreshToken(res, await generateRefreshToken(user));
		return res.status(200).json({
			accessToken: await generateAccessToken(user),
			user: returnedUser,
		});
	} else {
		let errors = extractErrors(validateUserLogin.errors);
		return res.status(422).json({ errors });
	}
};

// logout user Controller
exports.logoutUserController = async (req, res, next) => {
	await sendRefreshToken(res, "");
	return res.status(200).json({ accessToken: "" });
};

// load current user
exports.loadCurrentUser = async (req, res, next) => {
	const { userId } = req.payload;
	const user = await User.findById(userId, { password: 0 });
	return res.status(200).json({ user });
};
