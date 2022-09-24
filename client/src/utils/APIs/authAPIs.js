import api from "../api";

const loginUser = async (formData, handleAlert) => {
	return api
		.post("/auth/login", formData)
		.then((res) => {
			return res;
			
		})
		.catch((err) => {
			// handle showing modal alert for errors with messages
			if (err.response.status === 403 || 422) {
				handleAlert(
					"error",
					err.response.data.errors || [err.response.data.error]
				);
			} else {
				// handle other server errors
				handleAlert("error", "Something Went Wrong!");
			}
		});
};
const registerUser = async (formData, handleAlert) => {
	return api
		.post("/auth/register", formData)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			if (err.response.status === 422) {
				handleAlert(
					"error",
					err.response.data.errors || [err.response.data.error]
				);
			} else {
				handleAlert("error", "Something Went Wrong!");
			}
		});
};

export { loginUser, registerUser };
