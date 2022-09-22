import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MoviePage from "./pages/MoviePage";
import SearchPage from "./pages/SearchPage";
import PrivateRouter from "./pages/PrivateRouter";

export default function RoutesProvider() {
	return (
		<Router>
			<div className="w-full h-screen ">
				<Routes>
					<Route
						path="*"
						element={
							<>
								<PrivateRouter>
									<Routes>
										<Route path="/" element={<Home />} />
										<Route path="/:movie_name" element={<MoviePage />} />
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
