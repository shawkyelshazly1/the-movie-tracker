import React from "react";

export default function Movie_Page_SM() {
	return (
		<>
			<div className=" lg:grid-cols-12 md:grid-cols-12 gap-[20px] lg:hidden md:hidden">
				<div className="relative grid grid-cols-6 grid-rows-6">
					<div className=" md:col-span-5 lg:col-span-5 md:col-start-9 lg:col-start-9 col-span-6 row-span-6">
						<img
							className="rounded-[20px]"
							src="https://i.ytimg.com/vi/BmllggGO4pM/maxresdefault.jpg"
							alt=""
						/>
					</div>
					<div className="absolute left-[20px] bottom-[-20px] col-start-1 col-span-2  row-span-6 ">
						<img
							className=" rounded-[20px] min-w-[108px] min-h-[146px]"
							src="https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.7273_AL_.jpg"
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-row gap-[20px] mt-[30px] lg:hidden md:hidden">
				<h2 className="font-roboto font-medium text-[18px] rounded-[20px] border-black border-[1px] w-[98px] h-[33px] flex items-center justify-center">
					Action
				</h2>
				<h2 className="font-roboto font-medium text-[18px] rounded-[20px] border-black border-[1px] w-[98px] h-[33px] flex items-center justify-center">
					Sci-Fi
				</h2>
			</div>
			<p className="text-[18px] font-roboto font-medium mt-[5px] lg:hidden md:hidden">
				A thief who steals corporate secrets through the use of dream-sharing
				technology is given the inverse task of planting an idea into the mind
				of a C.E.O., but his tragic past may doom the project and his team to
				disaster.
			</p>
			<div className="flex flex-row items-center gap-6 lg:hidden md:hidden">
				<div className="flex flex-col items-center">
					<h3 className="text-[18px] font-roboto font-medium">IMDB Rating</h3>
					<p className="text-[15px] font-roboto font-medium">
						⭐ 9.1
						<span className="text-[#636363] text-[12px] font-normal">/10</span>
					</p>
				</div>
				<h3 className="text-[15px] font-roboto font-normal text-[#636363]">
					8k Reviews
				</h3>
			</div>
		</>
	);
}
