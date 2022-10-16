import React from "react";

import ScrollableHComponent from "./ScrollableHComponent";

export default function Home_Component_LG_MD({ suggestedMedia, trackedMedia }) {
	if (!trackedMedia) {
		trackedMedia = [];
	}

	return (
		<div className="lg:flex md:flex flex-col col-span-12 hidden ">
			<div className="gap-28 col-span-12 justify-between flex flex-row  col-start-1 h-fit pb-5 mt-[150px]">
				<div className=" no-scrollbar flex-1  overflow-hidden overflow-x-scroll">
					<ScrollableHComponent
						type={"tracked"}
						title={"Currently Watching"}
						cards={
							trackedMedia.length > 0
								? trackedMedia.filter((media) => !media.watched)
								: []
						}
					/>
				</div>
				<div className="no-scrollbar flex-[18%] overflow-hidden overflow-x-scroll">
					<ScrollableHComponent
						title={"Suggested To Watch"}
						cards={suggestedMedia}
					/>
				</div>
			</div>
			<div className="no-scrollbar flex flex-col  col-span-12 col-start-1 h-fit  lg:mt-[-15px] md:mt-[-15px]">
				<ScrollableHComponent
					type={"tracked"}
					title={"Previously Watched"}
					cards={
						trackedMedia.length > 0
							? trackedMedia.filter((media) => media.watched)
							: []
					}
				/>
			</div>
		</div>
	);
}
