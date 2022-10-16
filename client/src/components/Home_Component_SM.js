import React from "react";
import ScrollableHComponent from "./ScrollableHComponent";

export default function Home_Component_SM({ suggestedMedia, trackedMedia }) {
	if (!trackedMedia) {
		trackedMedia = [];
	}
	return (
		<div className="flex flex-col col-span-6 lg:hidden md:hidden col-start-1 h-fit pb-5 mt-[150px]">
			<ScrollableHComponent
				type={"tracked"}
				title={"Currently Watching"}
				cards={
					trackedMedia.length > 0
						? trackedMedia.filter((media) => !media.watched)
						: []
				}
			/>
			<ScrollableHComponent
				type={"tracked"}
				title={"Previously Watched"}
				cards={
					trackedMedia.length > 0
						? trackedMedia.filter((media) => media.watched)
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
