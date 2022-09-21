import React, { useEffect } from "react";
import MovieCard from "./MovieCard";

export default function ScrollableHComponent({ title, cards }) {
	useEffect(() => {
		const component = document.querySelector(".cardViewer");
		if (component) {
			component.addEventListener("wheel", (e) => {
				component.scrollLeft += e.deltaY * 4;
			});
		}
	}, []);
	return (
		<div className="pt-[37px]  col-span-6 row-span-3 flex flex-col gap-[11px]">
			<h1 className="text-[20px] font-roboto font-medium row-span-1">
				{title}
			</h1>
			<div className=" no-scrollbar lg:cardViewer md:cardViewer grid auto-cols-[minmax(64px,1fr);] grid-flow-col  overflow-x-auto justify-between overflow-hidden scroll-smooth">
				{cards.map((card) => (
					<MovieCard />
				))}
			</div>
		</div>
	);
}
