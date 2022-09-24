import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Home_Component_LG_MD from "../components/Home_Component_LG_MD";
import Home_Component_SM from "../components/Home_Component_SM";
import { AppAlertContext } from "../AppAlertContext";

import { getSuggested, getTrackList } from "../utils/APIs/homeAPIs";

export default function Home() {
	const { setAlertType, setAlertData } = useContext(AppAlertContext);
	// handle alert
	const handleAlert = (type, data) => {
		setAlertData(data);
		setAlertType(type);
	};

	const [suggestedMedia, setsuggestedMedia] = useState();
	const [tracklist, setTrackList] = useState();

	useEffect(() => {
		// load top weekly trending movies / shows
		getSuggested(handleAlert).then((res) => {
			setsuggestedMedia(res);
		});

		// load currently tracked & watching movies
		getTrackList(handleAlert).then((res) => {
			setTrackList(res);
		});
	}, []);

	return (
		<div className="w-full h-full grid grid-cols-6 lg:grid-cols-12 md:grid-cols-12 grid-rows-6 px-[20px] lg:px-[80px] md:px-[80px] ">
			<Header />
			{/* Home component for large and medium screens */}
			<Home_Component_LG_MD
				suggestedMedia={suggestedMedia}
				trackedMedia={tracklist}
			/>
			{/* Home component for small screens  */}
			<Home_Component_SM
				suggestedMedia={suggestedMedia}
				trackedMedia={tracklist}
			/>
		</div>
	);
}
