import React from "react";

export default function Movie_Page_LG_MD() {
	return (
		<div className="  lg:grid md:grid lg:grid-cols-12 md:grid-cols-6 gap-[20px]  hidden">
			<div className="md:col-span-1 lg:col-span-2 lg:h-[291px] md:h-[291px] w-fit">
				<img
					className="lg:h-[291px] md:h-[291px] rounded-[20px] "
					src="https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.7273_AL_.jpg"
					alt=""
				/>
			</div>
			<div className="flex flex-col md:col-span-3 lg:col-span-4 lg:col-start-3 md:col-start-2 gap-[19px] lg:ml-[-20px]">
				<div className="flex flex-row gap-[20px] mt-[30px]">
					<h2 className="font-roboto font-medium text-[18px] rounded-[20px] border-black border-[1px] w-[98px] h-[33px] flex items-center justify-center">
						Action
					</h2>
					<h2 className="font-roboto font-medium text-[18px] rounded-[20px] border-black border-[1px] w-[98px] h-[33px] flex items-center justify-center">
						Sci-Fi
					</h2>
				</div>
				<p className="text-[18px] font-roboto font-medium ">
					A thief who steals corporate secrets through the use of dream-sharing
					technology is given the inverse task of planting an idea into the mind
					of a C.E.O., but his tragic past may doom the project and his team to
					disaster.
				</p>
				<div className="flex flex-row items-center gap-6 mt-[29px]">
					<div className="flex flex-col items-center">
						<h3 className="text-[18px] font-roboto font-medium">IMDB Rating</h3>
						<p className="text-[15px] font-roboto font-medium">
							⭐ 9.1
							<span className="text-[#636363] text-[12px] font-normal">
								/10
							</span>
						</p>
					</div>
					<h3 className="text-[15px] font-roboto font-normal text-[#636363]">
						8k Reviews
					</h3>
				</div>
			</div>
			<div className=" md:col-span-3 lg:col-span-5 md:col-start-5 lg:col-start-9 flex md:justify-center md:items-center">
				<img
					className="rounded-[20px] lg:h-[291px]  md:col-span-3"
					src="https://i.ytimg.com/vi/BmllggGO4pM/maxresdefault.jpg"
					alt=""
				/>
			</div>
		</div>
	);
}
