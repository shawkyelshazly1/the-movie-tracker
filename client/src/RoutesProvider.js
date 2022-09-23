import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MoviePage from "./pages/MoviePage";
import SearchPage from "./pages/SearchPage";
import PrivateRouter from "./pages/PrivateRouter";
import AlertComponent from "./components/AlertComponent";
import { AppAlertContext } from "./AppAlertContext";

export default function RoutesProvider() {
	const { alertType, alertData } = useContext(AppAlertContext);
	return (
		<Router>
			<div className="w-full h-screen relative">
				{alertData ? (
					<AlertComponent data={alertData} type={alertType} />
				) : (
					<></>
				)}
				<Routes>
					<Route
						path="*"
						element={
							<>
								<PrivateRouter>
									<Routes>
										<Route path="/" element={<Home />} />
										<Route
											path="/:media_type/:media_id"
											element={<MoviePage />}
										/>
										<Route path="/search" element={<SearchPage />} />
									</Routes>
								</PrivateRouter>
							</>
						}
					/>
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</Router>
	);
}
