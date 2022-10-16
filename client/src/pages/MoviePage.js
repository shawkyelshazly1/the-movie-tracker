import React, { useContext, useEffect, useState } from "react";
import EpisodeCard from "../components/EpisodeCard";
import EpisodesSlider from "../components/EpisodesSlider";
import Header from "../components/Header";
import Movie_Page_LG_MD from "../components/Movie_Page_LG_MD";
import Movie_Page_SM from "../components/Movie_Page_SM";
import ScrollableHComponent from "../components/ScrollableHComponent";
import { useParams } from "react-router-dom";
import imdbAPI from "../utils/imdbAPI";
import { AppAlertContext } from "../AppAlertContext";
import {
	checkTrackedMedia,
	getMediaDetails,
	trackOrUntrackMedia,
} from "../utils/APIs/moviePageAPIs";
import { ReactComponent as OpenEyeComponent } from "../assets/open-eye.svg";

export default function MoviePage() {
	const { media_type, media_id } = useParams();
	const [loadedMedia, setLoadedMedia] = useState();
	const [trackedMedia, setTrackedMedia] = useState();

	const { setAlertType, setAlertData } = useContext(AppAlertContext);
	// handle alert
	const handleAlert = (type, data) => {
		setAlertData(data);
		setAlertType(type);
	};

	useEffect(() => {
		// call api based on media type to get the media info from TMDB API
		getMediaDetails(media_type, media_id, handleAlert).then((res) => {
			console.log(res);
			setLoadedMedia(res);
		});
		checkTrackedMedia(String(media_id), media_type, handleAlert).then((res) => {
			setTrackedMedia(res);
		});
	}, [media_type, media_id]);

	// handle clicking on tracking or watching a movie
	const handleTrackingMedia = () => {
		const tracked = trackedMedia ? true : false;
		const watched = media_type === "movie" ? true : false;
		trackOrUntrackMedia(
			tracked,
			String(media_id),
			watched,
			loadedMedia.poster_path,
			media_type,
			handleAlert
		).then((res) => {
			setTrackedMedia(res);
		});
	};

	if (!loadedMedia) return <></>;
	return (
		<div className="w-full h-full grid grid-cols-6 lg:grid-cols-12 md:grid-cols-6 grid-rows-6   px-[20px] lg:px-[80px] md:px-[40px]  ">
			<Header />
			<div className="flex flex-col mt-[190px] lg:col-span-12 md:col-span-6 col-span-6 gap-[24px]  ">
				<div className="flex flex-row flex-wrap justify-between ">
					<h1 className="text-[30px] lg:text-[40px] md:text-[40px] font-roboto font-bold">
						{media_type === "tv" && loadedMedia
							? loadedMedia.name
							: loadedMedia.title}
					</h1>
					{media_type === "tv" ? (
						<button
							onClick={() => {
								handleTrackingMedia();
							}}
							className="lg:text-lg md:text-lg text-sm flex justify-center items-center gap-3 w-[50%] lg:w-fit md:w-fit bg-slate-500 text-white font-roboto font-semibold mr-3 px-3 rounded-2xl"
						>
							<OpenEyeComponent />
							{trackedMedia ? "Untrack TV Show" : "Track TV Show"}
						</button>
					) : (
						<button
							onClick={() => {
								handleTrackingMedia();
							}}
							className="lg:text-lg md:text-lg text-sm flex justify-center items-center gap-3 w-[50%] lg:w-fit md:w-fit bg-slate-500 text-white font-roboto font-semibold mr-3 px-3 rounded-2xl "
						>
							<OpenEyeComponent />
							{trackedMedia && trackedMedia.watched
								? "Mark Movie As Unwatched"
								: "Mark Movie As Watched"}
						</button>
					)}
				</div>

				{/* start style and arranged elements for lg & md devices */}
				<Movie_Page_LG_MD media={loadedMedia} media_type={media_type} />
				{/* start style and arranged elements for lg & md devices */}

				{/* start style and arranged elements for mobile devices */}
				<Movie_Page_SM media={loadedMedia} media_type={media_type} />
				{/* end style and arranged elements for mobile devices */}

				{/* this section only if a series */}
				{media_type === "tv" ? (
					<EpisodesSlider
						numberOfSeasons={loadedMedia.number_of_seasons}
						media={loadedMedia}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
