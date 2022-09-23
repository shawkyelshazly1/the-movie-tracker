import React from "react";
import { getTMDBImageUrl } from "../utils/helpers";

export default function EpisodeCard({ episode }) {
	let imageSource = episode.still_path;
	if (!imageSource) {
		imageSource =
			"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
	} else {
		imageSource = getTMDBImageUrl(episode.still_path);
	}

	return (
		<div className=" rounded-[20px] min-w-[310px] min-h-[200px] max-h-[200px] relative mb-[20px] col-span-6 lg:col-span-3 md:col-span-3">
			<div className="w-full h-full">
				<img
					className="h-full w-full rounded-[20px]"
					src={imageSource}
					alt=""
				/>
			</div>
			<div className="w-full h-[60px] bg-zinc-50 rounded-bl-[20px] rounded-br-[20px] absolute bottom-0 left-0 flex items-center ">
				<h1 className="text-[20px] font-roboto font-bold ml-[18px]">
					{episode.name}
				</h1>
			</div>
		</div>
	);
}
