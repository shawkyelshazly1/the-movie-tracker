import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import MovieCardSearch from "../components/MovieCardSearch";
import { CurrentUserContext } from "../CurrentUserContext";

export default function SearchPage() {
	const { searchResults } = useContext(CurrentUserContext);
	useEffect(() => {
		return () => {
			// setSearchKeyword("");
			// setSearchResults([]);
		};
	}, []);
	return (
		<div className="w-full h-full grid grid-cols-6 lg:grid-cols-12 md:grid-cols-6 grid-rows-6 px-[20px] lg:px-[80px] md:px-[80px] ">
			<Header page={"search"} />
			<div className="w-full h-fit grid col-span-6 grid-cols-6 lg:grid-cols-12 md:grid-cols-6 lg:col-span-12 md:col-span-6 row-start-3 md:row-start-2 lg:row-start-2 smd:row-start-3 gap-[15px] md:mt-[35px] lg:mt-[35px] smd:mt-[-50px]   mt-[-20px] pb-[20px]">
				{searchResults.map((media) => (
					<MovieCardSearch key={media.id || media.mediaId} media={media} />
				))}
			</div>
		</div>
	);
}
