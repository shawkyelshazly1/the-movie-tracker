import { createContext, useState } from "react";

export const AppAlertContext = createContext(null);

export const AppAlertProvider = ({ children }) => {
	const [alertType, setAlertType] = useState();
	const [alertData, setAlertData] = useState();

	const stateValues = {
		alertType,
		setAlertType,
		alertData,
		setAlertData,
	};

	return (
		<AppAlertContext.Provider value={stateValues}>
			{children}
		</AppAlertContext.Provider>
	);
};
