import React, { useContext, useEffect, useState } from "react";
import { getTMDBImageUrl } from "../utils/helpers";
import ReactPlayer from "react-player";
import imdbAPI from "../utils/imdbAPI";
import { AppAlertContext } from "../AppAlertContext";

export default function Movie_Page_LG_MD({ media, media_type }) {
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
				if (Array.isArray(trailer)) {
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
		<div className="  lg:grid md:grid lg:grid-cols-12 md:grid-cols-6 gap-[20px]  hidden">
			<div className="md:col-span-1 lg:col-span-2 lg:h-[291px] md:h-[291px] w-fit">
				<img
					className="lg:h-[291px] md:h-[291px] rounded-[20px] "
					src={getTMDBImageUrl(media.poster_path)}
					alt=""
				/>
			</div>
			<div className="flex flex-col md:col-span-3 lg:col-span-4 lg:col-start-3 md:col-start-2 gap-[19px] lg:ml-[-20px]">
				<div className="flex flex-wrap flex-row gap-[20px] mt-[30px]">
					{media.genres.map((genre, i) => (
						<h2
							key={i}
							className="font-roboto font-medium text-[18px] rounded-[20px] border-black px-4 border-[1px] min-w-[98px]  min-h-[33px] flex items-center justify-center"
						>
							{genre.name}
						</h2>
					))}
				</div>
				<p className="text-[18px] font-roboto font-medium ">{media.overview}</p>
				<div className="flex flex-row items-center gap-6 mt-[29px]">
					<div className="flex flex-col items-center">
						<h3 className="text-[18px] font-roboto font-medium">IMDB Rating</h3>
						<p className="text-[15px] font-roboto font-medium">
							⭐ {media.vote_average.toFixed(1)}
							<span className="text-[#636363] text-[12px] font-normal">
								/10
							</span>
						</p>
					</div>
					<h3 className="text-[15px] font-roboto font-normal text-[#636363]">
						{media.vote_count} Reviews
					</h3>
				</div>
			</div>
			<div className="rounded-[20px] relative md:col-span-3 lg:col-span-5 md:col-start-5 lg:col-start-9 flex md:justify-center md:items-center">
				<div className="rounded-[20px] lg:h-[291px]  md:col-span-3">
					<ReactPlayer
						controls={true}
						className="absolute top-0 left-0"
						url={`https://www.youtube.com/watch?v=${trailer}`}
					/>
				</div>
			</div>
		</div>
	);
}
