import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Home_Component_LG_MD from "../components/Home_Component_LG_MD";
import Home_Component_SM from "../components/Home_Component_SM";
import { AppAlertContext } from "../AppAlertContext";
import imdbAPI from "../utils/imdbAPI";
import api from "../utils/api";

export default function Home() {
	const { setAlertType, setAlertData } = useContext(AppAlertContext);
	// handle alert
	const handleAlert = (type, data) => {
		setAlertData(data);
		setAlertType(type);
	};

	const [suggestedMedia, setsuggestedMedia] = useState();
	const [trackedMedia, setTrackedMedia] = useState();

	useEffect(() => {
		// load top weekly trending  shows
		// #TODO: remove shows/movies already watched or being watched now
		imdbAPI
			.get(`/trending/all/week`)
			.then((res) => {
				console.log(res);
				setsuggestedMedia(res.data.results);
				handleAlert("", "");
			})
			.catch((err) => {
				console.error(err);
				handleAlert("error", "Something Went Wrong!");
			});

		// get tracked media
		// api
		// 	.get("/trackedMedia/")
		// 	.then((res) => {
		// 		setTrackedMedia(res.data.media);
		// 		handleAlert("", "");
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 		handleAlert("error", "Something Went Wrong!");
		// 	});
	}, []);

	return (
		<div className="w-full h-full grid grid-cols-6 lg:grid-cols-12 md:grid-cols-12 grid-rows-6 px-[20px] lg:px-[80px] md:px-[80px] ">
			<Header />
			{/* Home component for large and medium screens */}
			<Home_Component_LG_MD
				suggestedMedia={suggestedMedia}
				trackedMedia={trackedMedia}
			/>
			{/* Home component for small screens  */}
			<Home_Component_SM
				suggestedMedia={suggestedMedia}
				trackedMedia={trackedMedia}
			/>
		</div>
	);
}
