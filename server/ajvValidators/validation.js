const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");
const { userLoginSchema, userRegisterSchema } = require("./schemas");

const ajvInstance = new Ajv({ allErrors: true, $data: true });
addFormats(ajvInstance);
require("ajv-errors")(ajvInstance);

const validateUserLogin = ajvInstance.compile(userLoginSchema);
const validateUserRegister = ajvInstance.compile(userRegisterSchema);

module.exports = { validateUserLogin, validateUserRegister };
