import React from "react";
import EpisodeCard from "../components/EpisodeCard";
import Header from "../components/Header";
import ScrollableHComponent from "../components/ScrollableHComponent";

export default function MoviePage() {
	return (
		<div className="w-full h-full grid grid-cols-6 lg:grid-cols-12 md:grid-cols-6 grid-rows-6   px-[20px] lg:px-[80px] md:px-[40px]  ">
			<Header />
			<div className="flex flex-col mt-[190px] lg:col-span-12 md:col-span-6 col-span-6 gap-[24px]  ">
				<h1 className="text-[30px] lg:text-[40px] md:text-[40px] font-roboto font-bold">
					The Gray Man
				</h1>

				{/* start style and arranged elements for lg & md devices */}
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
							A thief who steals corporate secrets through the use of
							dream-sharing technology is given the inverse task of planting an
							idea into the mind of a C.E.O., but his tragic past may doom the
							project and his team to disaster.
						</p>
						<div className="flex flex-row items-center gap-6 mt-[29px]">
							<div className="flex flex-col items-center">
								<h3 className="text-[18px] font-roboto font-medium">
									IMDB Rating
								</h3>
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
				{/* start style and arranged elements for lg & md devices */}

				{/* start style and arranged elements for mobile devices */}
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
							<span className="text-[#636363] text-[12px] font-normal">
								/10
							</span>
						</p>
					</div>
					<h3 className="text-[15px] font-roboto font-normal text-[#636363]">
						8k Reviews
					</h3>
				</div>
				{/* end style and arranged elements for mobile devices */}

				{/* this section only if a series */}
				<div className="flex flex-col gap-[22px] lg:flex-row md:flex-row lg:gap-[30px] lg:items-center md:items-center lg:mt-[30px] md:mt-[30px] lg:mb-[10px] md:mb-[10px]">
					<h1 className="text-[30px] font-roboto font-bold mt-[40px] lg:mt-[0px] md:mt-[0px]">
						Seasons
					</h1>
					<div className="flex flex-row gap-[20px] mt-[-10px] lg:mt-[0px] md:mt-[0px]">
						<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
							1
						</button>
						<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
							2
						</button>
						<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
							3
						</button>
						<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
							4
						</button>
						<button className="w-[39px] h-[39px] rounded-[10px] bg-[#D9D9D9] flex items-center justify-center text-[20px] font-roboto font-bold">
							5
						</button>
					</div>
				</div>

				<div className="  col-span-6 lg:col-span-12 md:col-span-12   lg:grid md:grid lg:grid-cols-12 md:grid-cols-12   ">
					<div className="  no-scrollbar col-span-6 lg:col-span-12 md:col-span-12 grid  auto-cols-min md:grid-cols-[80px_minmax(80px,_1fr)_90px] lg:grid-cols-[80px_minmax(80px,_1fr)_90px] grid-cols-6 grid-flow-col lg:overflow-x-scroll gap-[65px] lg:gap-[30px] md:gap-[30px] overflow-x-auto overflow-hidden ">
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
						<EpisodeCard />
					</div>
				</div>
			</div>
		</div>
	);
}
