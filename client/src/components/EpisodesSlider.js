import React, { useContext, useEffect, useState } from "react";
import {
	loadSeasonEpisodes,
	loadWatchedEpisodes,
	markEpisodeWatchedOrNot,
	markSeasonWatchedOrNot,
} from "../utils/APIs/moviePageAPIs";
import imdbAPI from "../utils/imdbAPI";
import EpisodeCard from "./EpisodeCard";
import { ReactComponent as OpenEyeComponent } from "../assets/open-eye.svg";
import { AppAlertContext } from "../AppAlertContext";

export default function EpisodesSlider({ numberOfSeasons, media_id }) {
	const [selectedSeason, setselectedSeason] = useState(1);
	const [seasonEpisodes, setseasonEpisodes] = useState();
	const [watchedEpisodes, setWatchedEpisodes] = useState([]);
	const { setAlertType, setAlertData } = useContext(AppAlertContext);
	// handle alert
	const handleAlert = (type, data) => {
		setAlertData(data);
		setAlertType(type);
	};
	// use effect to load season episodes
	useEffect(() => {
		// load season episodes api
		loadSeasonEpisodes(media_id, selectedSeason, handleAlert).then((res) => {
			setseasonEpisodes(res);
		});

		let scrollableEpisodesDiv = document.querySelector(".scrollableEpisodes");
		scrollableEpisodesDiv.scrollLeft = 0;
	}, [selectedSeason, media_id]);

	// use effect to load watched episodes for a series
	useEffect(() => {
		// load  watched episodes
		loadWatchedEpisodes(media_id, handleAlert).then((res) => {
			setWatchedEpisodes(res);
		});
	}, [media_id]);

	// handle marking episode as watched or not watched
	const handleMarkingEpisode = (episodeId, watched) => {
		// api call to update watched episodes
		markEpisodeWatchedOrNot(media_id, episodeId, handleAlert, watched).then(
			(res) => {
				setWatchedEpisodes(res);
			}
		);
	};

	// handle Marking Season watched or unwatched
	const handleMarkingSeason = () => {
		const episodes = seasonEpisodes.map((episode) => String(episode.id));
		const watched = seasonEpisodes.every((episode) =>
			watchedEpisodes.includes(String(episode.id))
		);
		markSeasonWatchedOrNot(media_id, episodes, watched, handleAlert).then(
			(res) => {
				setWatchedEpisodes(res);
			}
		);
	};

	if (!numberOfSeasons || !media_id) return <></>;

	return (
		<>
			<div className="flex flex-col gap-[22px] lg:flex-row md:flex-row lg:gap-[30px] lg:items-center md:items-center lg:mt-[30px] md:mt-[30px] lg:mb-[10px] md:mb-[10px]">
				<h1 className="text-[30px] font-roboto font-bold mt-[40px] lg:mt-[0px] md:mt-[0px]">
					Seasons
				</h1>
				<div className="flex flex-row flex-wrap gap-[20px] mt-[-10px] lg:mt-[0px] md:mt-[0px]">
					{[...Array(numberOfSeasons)].map((season, i) => (
						<button
							onClick={() => setselectedSeason(i + 1)}
							key={i}
							className={
								`${
									selectedSeason === i + 1
										? "bg-[#555555] text-white"
										: "bg-[#D9D9D9]"
								}` +
								" w-[39px] h-[39px] rounded-[10px]  flex items-center justify-center text-[20px] font-roboto font-bold"
							}
						>
							{i + 1}
						</button>
					))}
				</div>
			</div>
			<div className="flex w-full items-center justify-between">
				<h1 className="font-roboto lg:text-2xl md:text-2xl text-xl text-gray-500 font-semibold">
					Season {selectedSeason}
				</h1>

				<button
					onClick={() => {
						handleMarkingSeason();
					}}
					className="lg:text-lg md:text-lg text-sm flex justify-center items-center gap-3 w-[50%] lg:w-fit md:w-fit bg-slate-500 text-white font-roboto font-semibold mr-3 px-3 rounded-2xl"
				>
					<OpenEyeComponent />{" "}
					<span>
						{seasonEpisodes &&
						seasonEpisodes.every((episode) =>
							watchedEpisodes.includes(String(episode.id))
						)
							? "Mark Season as Uwatched"
							: "Mark Season as watched"}
					</span>
				</button>
			</div>
			<div className="  col-span-6 lg:col-span-12 md:col-span-12   lg:grid md:grid lg:grid-cols-12 md:grid-cols-12   ">
				<div className="scrollableEpisodes  no-scrollbar col-span-6 lg:col-span-12 md:col-span-12 grid  auto-cols-min md:grid-cols-[80px_minmax(80px,_1fr)_90px] lg:grid-cols-[80px_minmax(80px,_1fr)_90px] grid-cols-6 grid-flow-col lg:overflow-x-scroll gap-[65px] lg:gap-[30px] md:gap-[30px] overflow-x-auto overflow-hidden ">
					{seasonEpisodes ? (
						seasonEpisodes.map((episode) => (
							<EpisodeCard
								key={episode.id}
								episode={episode}
								watched={
									watchedEpisodes
										? watchedEpisodes.includes(String(episode.id))
										: false
								}
								handleMarkingEpisode={handleMarkingEpisode}
							/>
						))
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}
