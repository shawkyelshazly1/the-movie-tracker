import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieCardWithoutOverlay from "./MovieCardWithoutOverlay";

export default function ScrollableHComponent({ title, cards, type }) {
	useEffect(() => {
		const component = document.querySelector(".cardViewer");
		if (component) {
			component.addEventListener("wheel", (e) => {
				component.scrollLeft += e.deltaY * 4;
			});
		}
	}, []);
	if (!cards) return <>"Loading..."</>;
	return (
		<div className="no-scrollbar pt-[37px]  col-span-6  md:col-span-12 row-span-3 flex flex-col gap-[11px] lg:overflow-x-scroll md:overflow-x-scroll">
			<h1 className="text-[20px] md:text-[25px] lg:text-[25px] font-roboto font-medium row-span-1">
				{title}
			</h1>
			<div className="no-scrollbar lg:cardViewer md:col-span-12 lg:col-span-12 auto-cols-min  md:cardViewer grid  grid-flow-col gap-6 overflow-x-auto overflow-hidden scroll-smooth">
				{cards.length < 1 ? (
					<>
						<h1 className="text-[15px] md:text-[18px] lg:text-[18px] w-full col-span-12 ">
							{"  "}🔍 Search for your favourite TV Shows / Movies 🎥 and start
							tracking your progress.
						</h1>
					</>
				) : (
					<>
						{type === "tracked" ? (
							<>
								{cards.map((media) => (
									<MovieCard key={media.id || media.mediaId} media={media} />
								))}
							</>
						) : (
							<>
								{cards.map((media) => (
									<MovieCardWithoutOverlay
										key={media.id || media.mediaId}
										media={media}
									/>
								))}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}
