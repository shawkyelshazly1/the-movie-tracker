import { RouterProvider } from "react-router";
import "./App.css";
import { CurrentUserProvider } from "./CurrentUserContext";
import RoutesProvider from "./RoutesProvider";

function App() {
	return (
		<CurrentUserProvider>
			<RoutesProvider />
		</CurrentUserProvider>
	);
}

export default App;
