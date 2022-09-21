import React from "react";

export default function MovieCardWithoutOverlay() {
	return (
		<div className="col-span-3 lg:col-span-1 md:col-span-1 flex w-[158px] h-[248px] rounded-[20px] cursor-pointer relative">
			<img
				className="rounded-[20px]"
				src="https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.7273_AL_.jpg"
				alt=""
			/>
		</div>
	);
}
