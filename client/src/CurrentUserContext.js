import * as React from "react";
import api from "./utils/api";

// current user context
export const CurrentUserContext = React.createContext(null);

// current user provider to wrap it with app
export const CurrentUserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = React.useState();
	const [authLoading, setAuthLoading] = React.useState(true);

	// use effect to validate login everytime component mounted
	React.useEffect(() => {
		checkLogin();
	}, []);

	// mock test data
	const testData = "test data";

	// check login function
	const checkLogin = () => {
		const token = localStorage.getItem("accessToken");

		setAuthLoading(true);

		if (token && token !== "") {
			api.get(`/auth/`, {}).then((res) => {
				const { user } = res.data;
				setAuthLoading(false);
				if (user) {
					setCurrentUser(user);
				}
			});
		} else {
			setAuthLoading(false);
			setCurrentUser(null);
		}
	};

	// handle logout function
	const handleLogout = () => {
		// remove user from context and token from localstorage
		localStorage.setItem("accessToken", "");
		setCurrentUser(null);
	};

	const stateValues = {
		currentUser,
		setCurrentUser,
		authLoading,
		setAuthLoading,
		checkLogin,
		handleLogout,
		testData,
	};

	return (
		<CurrentUserContext.Provider value={stateValues}>
			{children}
		</CurrentUserContext.Provider>
	);
};
