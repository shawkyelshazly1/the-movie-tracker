import React from "react";
import { Link } from "react-router-dom";
import { getTMDBImageUrl } from "../utils/helpers";

export default function MovieCardWithoutOverlay({ media }) {
	return (
		<Link
			to={`${media.media_type || media.mediaType}/${media.id || media.mediaId}`}
		>
			<div className="col-span-3 lg:col-span-1 md:col-span-1 flex w-[158px] h-[248px] lg:w-[177px] md:w-[177px] lg:h-[263px] md:h-[263px] rounded-[20px] cursor-pointer relative">
				<img
					className="rounded-[20px]"
					src={getTMDBImageUrl(media.poster_path || media.mediaCover)}
					alt=""
				/>
			</div>
		</Link>
	);
}
