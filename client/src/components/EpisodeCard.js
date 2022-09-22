import React from "react";

export default function EpisodeCard() {
	return (
		<div className=" rounded-[20px] min-w-[310px] relative mb-[20px] col-span-6 lg:col-span-3 md:col-span-3">
			<div className="w-full h-full">
				<img
					className="rounded-[20px]"
					src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/14/36/ustv-lost-season-6-12.jpg?resize=480:*"
					alt=""
				/>
			</div>
			<div className="w-full h-[60px] bg-zinc-50 rounded-bl-[20px] rounded-br-[20px] absolute bottom-0 left-0 flex items-center ">
				<h1 className="text-[20px] font-roboto font-bold ml-[18px]">
					Pilot: Part 1
				</h1>
			</div>
		</div>
	);
}
