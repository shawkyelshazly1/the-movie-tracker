import React from "react";

export default function Header({ page }) {
	return (
		<div className="grid col-span-6 items-center lg:col-span-12 md:col-span-12 row-span-1 grid-cols-6 lg:grid-cols-12 md:grid-cols-12 grid-rows-1 fixed  z-50 bg-white lg:pt-[30px] md:pt-[30px] pt-[38px] pb-[15px]">
			<h1 className="text-[35px]  leading-[40px] font-carosBold sm:col-span-2 lg:row-span-1 md:row-span-1 lg:col-span-1 md-col-span-1 col-start-1 row-span-1">
				The Movie Tracker
			</h1>
			<div
				className={
					"flex gap-[20px] col-span-2  " +
					`${page === "search" ? "col-start-6" : "col-start-5"}` +
					" flex-row row-span-1 items-center md:hidden lg:hidden"
				}
			>
				{page === "search" ? (
					<></>
				) : (
					<>
						<div className="w-[39px] h-[39px] bg-[#D9D9D9] rounded-[30px] flex items-center justify-center text-[20px] cursor-pointer">
							🔍
						</div>
					</>
				)}

				<div className="w-[39px] h-[39px] bg-[#D9D9D9] rounded-[30px] font-roboto font-semibold flex items-center justify-center  text-[30px] cursor-pointer">
					+
				</div>
			</div>
			{page === "search" ? (
				<input
					type="text"
					placeholder="🔍 Search a movie or a series"
					className="lg:hidden md:hidden mr-[20px] mt-[25px]  col-span-6 h-[52px] outline-none text-center text-[20px] font-roboto font-normal rounded-[30px] bg-[#D9D9D9] text-black"
				/>
			) : (
				<></>
			)}

			<input
				type="text"
				placeholder="🔍 Search a movie or a series"
				className="hidden lg:block md:block col-span-5 col-start-4 h-[57px] outline-none text-center text-[20px] font-roboto font-normal rounded-[30px] bg-[#D9D9D9] text-black"
			/>
		</div>
	);
}
