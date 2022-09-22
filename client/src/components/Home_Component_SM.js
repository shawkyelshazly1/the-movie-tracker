import React from "react";
import MovieCard from "./MovieCard";
import MovieCardWithoutOverlay from "./MovieCardWithoutOverlay";
import ScrollableHComponent from "./ScrollableHComponent";

export default function Home_Component_SM({ suggestedMedia, trackedMedia }) {
	if (!trackedMedia) {
		trackedMedia = [];
	}
	console.log(trackedMedia);
	return (
		<div className="flex flex-col col-span-6 lg:hidden md:hidden col-start-1 h-fit pb-5 mt-[150px]">
			<ScrollableHComponent
				type={"tracked"}
				title={"Currently Watching"}
				cards={
					trackedMedia.length > 0 || !trackedMedia
						? trackedMedia
								.filter((media) => !media.watched)
								.map((media) => media.mediaId)
						: []
				}
			/>
			<ScrollableHComponent
				type={"tracked"}
				title={"Previously Watched"}
				cards={
					trackedMedia.length > 0 || !trackedMedia
						? trackedMedia
								.filter((media) => media.watched)
								.map((media) => media.mediaId)
						: []
				}
			/>
			<ScrollableHComponent
				title={"Suggested To Watch"}
				cards={suggestedMedia}
			/>
		</div>
	);
}
