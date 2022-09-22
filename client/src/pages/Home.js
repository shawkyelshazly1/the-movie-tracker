import React, { useContext } from "react";
import Header from "../components/Header";
import Home_Component_LG_MD from "../components/Home_Component_LG_MD";
import Home_Component_SM from "../components/Home_Component_SM";
import { CurrentUserContext } from "../CurrentUserContext";

export default function Home() {
	

	return (
		<div className="w-full h-full grid grid-cols-6 lg:grid-cols-12 md:grid-cols-12 grid-rows-6 px-[20px] lg:px-[80px] md:px-[80px] ">
			<Header />
			{/* Home component for large and medium screens */}
			<Home_Component_LG_MD />
			{/* Home component for small screens  */}
			<Home_Component_SM />
		</div>
	);
}
