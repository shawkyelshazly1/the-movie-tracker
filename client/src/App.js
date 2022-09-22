import "./App.css";
import { AppAlertProvider } from "./AppAlertContext";
import { CurrentUserProvider } from "./CurrentUserContext";
import RoutesProvider from "./RoutesProvider";

function App() {
	
	return (
		<CurrentUserProvider>
			<AppAlertProvider>
				<RoutesProvider />
			</AppAlertProvider>
		</CurrentUserProvider>
	);
}

export default App;
