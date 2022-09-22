import React from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import MovieCardWithoutOverlay from "../components/MovieCardWithoutOverlay";
import ScrollableHComponent from "../components/ScrollableHComponent";

export default function Home() {
	return (
		<div className="w-full h-full grid grid-cols-6 lg:grid-cols-12 md:grid-cols-12 grid-rows-6 px-[20px] lg:px-[80px] md:px-[80px] ">
			<Header />
			<div className="lg:flex md:flex flex-col col-span-12 hidden ">
				<div className="gap-28 col-span-12 justify-between flex flex-row  col-start-1 h-fit pb-5 mt-[150px]">
					<div className=" flex-1  overflow-hidden overflow-x-scroll">
						<ScrollableHComponent
							title={"Currently Watching"}
							cards={[
								<MovieCard />,
								<MovieCard />,
								<MovieCard />,
								<MovieCard />,
								<MovieCard />,
								<MovieCard />,
								<MovieCard />,
								<MovieCard />,
							]}
						/>
					</div>
					<div className=" flex-[18%] overflow-hidden overflow-x-scroll">
						<ScrollableHComponent
							title={"Suggested To Watch"}
							type="tracked"
							cards={[
								<MovieCardWithoutOverlay />,
								<MovieCardWithoutOverlay />,
								<MovieCardWithoutOverlay />,
								<MovieCardWithoutOverlay />,
							]}
						/>
					</div>
				</div>
				<div className="flex flex-col  col-span-12 col-start-1 h-fit  lg:mt-[-15px] md:mt-[-15px]">
					<ScrollableHComponent
						title={"Previously Watched"}
						cards={[
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
							<MovieCard />,
						]}
					/>
				</div>
			</div>

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
		</div>
	);
}
