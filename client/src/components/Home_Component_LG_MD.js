import React from "react";
import MovieCard from "./MovieCard";
import MovieCardWithoutOverlay from "./MovieCardWithoutOverlay";
import ScrollableHComponent from "./ScrollableHComponent";

export default function Home_Component_LG_MD() {
	return (
		<div className="lg:flex md:flex flex-col col-span-12 hidden ">
			<div className="gap-28 col-span-12 justify-between flex flex-row  col-start-1 h-fit pb-5 mt-[150px]">
				<div className=" no-scrollbar flex-1  overflow-hidden overflow-x-scroll">
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
				<div className="no-scrollbar flex-[18%] overflow-hidden overflow-x-scroll">
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
			<div className="no-scrollbar flex flex-col  col-span-12 col-start-1 h-fit  lg:mt-[-15px] md:mt-[-15px]">
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
					]}
				/>
			</div>
		</div>
	);
}
