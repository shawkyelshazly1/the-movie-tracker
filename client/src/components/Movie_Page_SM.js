import React, { useContext, useEffect, useState } from "react";
import { getTMDBImageUrl } from "../utils/helpers";
import ReactPlayer from "react-player";
import { AppAlertContext } from "../AppAlertContext";
import imdbAPI from "../utils/imdbAPI";
export default function Movie_Page_SM({ media, media_type }) {
	const { setAlertType, setAlertData } = useContext(AppAlertContext);
	const [trailer, settrailer] = useState();
	// handle alert
	const handleAlert = (type, data) => {
		setAlertData(data);
		setAlertType(type);
	};

	// get the trailer url
	useEffect(() => {
		// call api based on media type to get the media info from TMDB API
		imdbAPI
			.get(`/${media_type}/${media.id}/videos`)
			.then((res) => {
				let trailer = res.data.results.filter(
					(video) =>
						video.official &&
						(video.type === "Trailer" || video.type === "Teaser") &&
						video.site === "YouTube"
				);
				if (Array.isArray(trailer) && trailer.length > 0) {
					settrailer(trailer[0].key);
				} else {
					settrailer(trailer.key);
				}
			})
			.catch((err) => {
				console.error(err);
				handleAlert("error", "Something Went Wrong!");
			});
	}, [media.id, media_type]);

	return (
		<>
			<div className=" lg:grid-cols-12 md:grid-cols-12 gap-[20px] lg:hidden md:hidden">
				<div className="relative grid grid-cols-6 grid-rows-6">
					<div className=" md:col-span-5 lg:col-span-5 md:col-start-9 lg:col-start-9 col-span-6 row-span-6">
						<ReactPlayer
							controls={true}
							className="relative top-0 left-0"
							url={`https://www.youtube.com/watch?v=${trailer}`}
						/>
						{/* <img
								className="rounded-[20px]"
								src="https://i.ytimg.com/vi/BmllggGO4pM/maxresdefault.jpg"
								alt=""
							/> */}
					</div>
					<div className="absolute left-[20px] bottom-[-20px] col-start-1 col-span-2  row-span-6 ">
						<img
							className=" rounded-[20px] min-w-[108px] min-h-[146px]"
							src={getTMDBImageUrl(media.poster_path)}
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap flex-row gap-[20px] mt-[30px] lg:hidden md:hidden">
				{media.genres.map((genre, i) => (
					<h2
						key={i}
						className="font-roboto font-medium text-[18px] rounded-[20px] border-black px-4 border-[1px] min-w-[98px]  min-h-[33px] flex items-center justify-center"
					>
						{genre.name}
					</h2>
				))}
			</div>
			<p className="text-[18px] font-roboto font-medium mt-[5px] lg:hidden md:hidden">
				{media.overview}
			</p>
			<div className="flex flex-row items-center gap-6 lg:hidden md:hidden">
				<div className="flex flex-col items-center">
					<h3 className="text-[18px] font-roboto font-medium">IMDB Rating</h3>
					<p className="text-[15px] font-roboto font-medium">
						⭐ {media.vote_average.toFixed(1)}
						<span className="text-[#636363] text-[12px] font-normal">/10</span>
					</p>
				</div>
				<h3 className="text-[15px] font-roboto font-normal text-[#636363]">
					{media.vote_count} Reviews
				</h3>
			</div>
		</>
	);
}
