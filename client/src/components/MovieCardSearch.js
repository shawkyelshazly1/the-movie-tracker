import React from "react";
import { Link } from "react-router-dom";
import { getTMDBImageUrl } from "../utils/helpers";

export default function MovieCardSearch({ media }) {
	const imageURL = media.poster_path || media.mediaCover;

	return (
		<div className="col-span-3 lg:col-span-2 lg:row-span-2 md:row-span-2 md:col-span-2 smd:col-span-2 flex  lg:w-full md:w-full lg:h-full md:h-full rounded-[20px] cursor-pointer relative">
			<Link
				to={`/${media.media_type || media.mediaType}/${
					media.id || media.mediaId
				}`}
			>
				<img
					className="rounded-[20px]"
					src={
						media.poster_path || media.mediaCover
							? getTMDBImageUrl(media.poster_path || media.mediaCover)
							: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
					}
					alt=""
				/>
			</Link>
		</div>
	);
}
