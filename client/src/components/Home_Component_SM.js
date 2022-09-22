import React from "react";
import MovieCard from "./MovieCard";
import MovieCardWithoutOverlay from "./MovieCardWithoutOverlay";
import ScrollableHComponent from "./ScrollableHComponent";

export default function Home_Component_SM() {
	return (
		<div className="flex flex-col col-span-6 lg:hidden md:hidden col-start-1 h-fit pb-5 mt-[150px]">
			<ScrollableHComponent
				title={"Currently Watching"}
				cards={[<MovieCard />, <MovieCard />, <MovieCard />, <MovieCard />]}
			/>
			<ScrollableHComponent
				title={"Previously Watched"}
				cards={[<MovieCard />, <MovieCard />, <MovieCard />, <MovieCard />]}
			/>
			<ScrollableHComponent
				title={"Suggested To Watch"}
				cards={[<MovieCardWithoutOverlay />]}
			/>
		</div>
	);
}
