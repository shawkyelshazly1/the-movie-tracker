import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTMDBImageUrl } from "../utils/helpers";

export default function MovieCard({ media }) {
	const [hovered, sethovered] = useState(false);

	const changeHoverState = () => {
		sethovered(!hovered);
	};
	console.log(media);
	return (
		<Link
			to={`${media.media_type || media.mediaType}/${media.id || media.mediaId}`}
		>
			<div
				className="col-span-3 lg:col-span-1 md:col-span-1 flex w-[158px]  h-[248px] lg:w-[177px] md:w-[177px] lg:h-[263px] md:h-[263px] rounded-[20px] cursor-pointer relative"
				onMouseLeave={changeHoverState}
				onMouseEnter={() => {
					changeHoverState();
				}}
			>
				<img
					className="rounded-[20px]"
					src={getTMDBImageUrl(media.poster_path || media.mediaCover)}
					alt=""
				/>
				<div
					className={
						" absolute w-full h-full  rounded-[20px] " +
						(hovered && media.mediaType === "tv"
							? "lg:block md:block hidden"
							: " hidden")
					}
				>
					<div className="w-full h-full bg-[#ABABAB] opacity-50 absolute rounded-[20px]"></div>
					<h1 className="absolute w-full h-full flex items-center justify-center font-roboto font-bold text-[50px] text-white z-40">
						67%
					</h1>
				</div>
			</div>
		</Link>
	);
}
