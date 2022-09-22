import * as React from "react";

// current user context
export const CurrentUserContext = React.createContext(null);

// current user provider to wrap it with app
export const CurrentUserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = React.useState();
	const [authLoading, setAuthLoading] = React.useState(false);

	// use effect to validate login everytime component mounted
	React.useEffect(() => {
		checkLogin();
	}, []);

	// mock test data
	const testData = "test data";

	// check login function
	const checkLogin = () => {
		console.log("checking login");
	};

	// handle logout function
	const handleLogout = () => {
		// remove user from context and token from localstorage
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
