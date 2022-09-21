import React from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import ScrollableHComponent from "../components/ScrollableHComponent";

export default function Home() {
	return (
		<div className="w-full h-full grid grid-flow-col grid-cols-6 lg:grid-cols-12 md:grid-cols-12 lg:grid-rows-6 md:grid-rows-6 grid-rows-6 px-[20px] lg:px-[80px] md:px-[80px] ">
			<Header />
			<div className="flex flex-col col-span-6 h-fit pb-5 mt-[150px]">
				<ScrollableHComponent
					title={"Currently Watching"}
					cards={[<MovieCard />, <MovieCard />, <MovieCard />]}
				/>
				<ScrollableHComponent
					title={"Previously Watched"}
					cards={[<MovieCard />, <MovieCard />, <MovieCard />]}
				/>
				<ScrollableHComponent
					title={"Suggested To Watch"}
					cards={[<MovieCard />, <MovieCard />, <MovieCard />]}
				/>
			</div>
		</div>
	);
}
