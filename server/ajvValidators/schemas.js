const userLoginSchema = {
	type: "object",
	properties: {
		username: { type: "string" },
		password: { type: "string", minLength: 6 },
	},
	required: ["username", "password"],
	errorMessage: {
		properties: {
			username: "Username must be a valid string",
			password: "Password must be valid with a minimum of 6 characters",
		},
	},
};

const userRegisterSchema = {
	type: "object",
	properties: {
		email: { type: "string", format: "email" },
		username: { type: "string" },
		password: { type: "string", minLength: 6 },
		confirmPassword: { const: { $data: "1/password" } },
	},
	required: ["username", "password", "email", "confirmPassword"],
	errorMessage: {
		properties: {
			username: "Username must be a valid string",
			email: "Email must be valid ex: name@example.com",
			password: "Password must be valid with a minimum of 6 characters",
			confirmPassword: "Password and confirm password doesn't match",
		},
	},
};

module.exports = { userLoginSchema, userRegisterSchema };
