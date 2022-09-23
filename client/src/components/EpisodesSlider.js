import React, { useEffect, useState } from "react";
import imdbAPI from "../utils/imdbAPI";
import EpisodeCard from "./EpisodeCard";

export default function EpisodesSlider({ seasons, media_id }) {
	const [selectedSeason, setselectedSeason] = useState(1);
	const [seasonEpisodes, setseasonEpisodes] = useState();

	useEffect(() => {
		imdbAPI.get(`/tv/${media_id}/season/${selectedSeason}`).then((res) => {
			setseasonEpisodes(res.data.episodes);
		});
		let scrollableEpisodesDiv = document.querySelector(".scrollableEpisodes");
		scrollableEpisodesDiv.scrollLeft = 0;
	}, [selectedSeason, media_id]);

	if (!seasons || !media_id) return <></>;
	return (
		<>
			<div className="flex flex-col gap-[22px] lg:flex-row md:flex-row lg:gap-[30px] lg:items-center md:items-center lg:mt-[30px] md:mt-[30px] lg:mb-[10px] md:mb-[10px]">
				<h1 className="text-[30px] font-roboto font-bold mt-[40px] lg:mt-[0px] md:mt-[0px]">
					Seasons
				</h1>
				<div className="flex flex-row gap-[20px] mt-[-10px] lg:mt-[0px] md:mt-[0px]">
					{seasons.map((season, i) => (
						<button
							onClick={() => setselectedSeason(i + 1)}
							key={i}
							className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold"
						>
							{i + 1}
						</button>
					))}
				</div>
			</div>

			<div className="  col-span-6 lg:col-span-12 md:col-span-12   lg:grid md:grid lg:grid-cols-12 md:grid-cols-12   ">
				<div className="scrollableEpisodes  no-scrollbar col-span-6 lg:col-span-12 md:col-span-12 grid  auto-cols-min md:grid-cols-[80px_minmax(80px,_1fr)_90px] lg:grid-cols-[80px_minmax(80px,_1fr)_90px] grid-cols-6 grid-flow-col lg:overflow-x-scroll gap-[65px] lg:gap-[30px] md:gap-[30px] overflow-x-auto overflow-hidden ">
					{seasonEpisodes ? (
						seasonEpisodes.map((episode) => (
							<EpisodeCard key={episode.id} episode={episode} />
						))
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}
