import React from "react";
import EpisodeCard from "../components/EpisodeCard";
import EpisodesSlider from "../components/EpisodesSlider";
import Header from "../components/Header";
import Movie_Page_LG_MD from "../components/Movie_Page_LG_MD";
import Movie_Page_SM from "../components/Movie_Page_SM";
import ScrollableHComponent from "../components/ScrollableHComponent";

export default function MoviePage() {
	return (
		<div className="w-full h-full grid grid-cols-6 lg:grid-cols-12 md:grid-cols-6 grid-rows-6   px-[20px] lg:px-[80px] md:px-[40px]  ">
			<Header />
			<div className="flex flex-col mt-[190px] lg:col-span-12 md:col-span-6 col-span-6 gap-[24px]  ">
				<h1 className="text-[30px] lg:text-[40px] md:text-[40px] font-roboto font-bold">
					The Gray Man
				</h1>

				{/* start style and arranged elements for lg & md devices */}
				<Movie_Page_LG_MD />
				{/* start style and arranged elements for lg & md devices */}

				{/* start style and arranged elements for mobile devices */}
				<Movie_Page_SM />
				{/* end style and arranged elements for mobile devices */}

				{/* this section only if a series */}
				<EpisodesSlider />
			</div>
		</div>
	);
}
