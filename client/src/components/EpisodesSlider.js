import React from "react";
import EpisodeCard from "./EpisodeCard";

export default function EpisodesSlider() {
	return (
		<>
			<div className="flex flex-col gap-[22px] lg:flex-row md:flex-row lg:gap-[30px] lg:items-center md:items-center lg:mt-[30px] md:mt-[30px] lg:mb-[10px] md:mb-[10px]">
				<h1 className="text-[30px] font-roboto font-bold mt-[40px] lg:mt-[0px] md:mt-[0px]">
					Seasons
				</h1>
				<div className="flex flex-row gap-[20px] mt-[-10px] lg:mt-[0px] md:mt-[0px]">
					<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
						1
					</button>
					<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
						2
					</button>
					<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
						3
					</button>
					<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
						4
					</button>
					<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
						5
					</button>
				</div>
			</div>

			<div className="  col-span-6 lg:col-span-12 md:col-span-12   lg:grid md:grid lg:grid-cols-12 md:grid-cols-12   ">
				<div className="  no-scrollbar col-span-6 lg:col-span-12 md:col-span-12 grid  auto-cols-min md:grid-cols-[80px_minmax(80px,_1fr)_90px] lg:grid-cols-[80px_minmax(80px,_1fr)_90px] grid-cols-6 grid-flow-col lg:overflow-x-scroll gap-[65px] lg:gap-[30px] md:gap-[30px] overflow-x-auto overflow-hidden ">
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
					<EpisodeCard />
				</div>
			</div>
		</>
	);
}
