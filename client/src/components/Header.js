import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { searchTMDB } from "../utils/APIs/homeAPIs";
import { AppAlertContext } from "../AppAlertContext";
import { CurrentUserContext } from "../CurrentUserContext";

export default function Header({ page }) {
	const [showSearchBar, setshowSearchBar] = useState(false);
	const { searchKeyword, setSearchKeyword, setSearchResults } =
		useContext(CurrentUserContext);
	const { setAlertType, setAlertData } = useContext(AppAlertContext);
	// handle alert
	const handleAlert = (type, data) => {
		setAlertData(data);
		setAlertType(type);
	};

	const navigate = useNavigate();
	const location = useLocation();
	const handleSubmitSearch = (e) => {
		if (e.key === "Enter") {
			if (location.pathname !== "/search") {
				navigate("/search");
				setSearchKeyword(e.target.value.trim());
			} else {
				setSearchKeyword(e.target.value.trim());
			}
			searchTMDB(handleAlert, searchKeyword).then((res) =>
				setSearchResults(res)
			);
		}
	};

	const handleInputChange = (e) => {
		setSearchKeyword(e.target.value.trim());
	};

	return (
		<div className="grid col-span-6 items-center lg:col-span-12 md:col-span-12 row-span-1 grid-cols-6 lg:grid-cols-12 md:grid-cols-12 grid-rows-1 fixed  z-50 bg-white lg:pt-[30px] md:pt-[30px] pt-[38px] pb-[15px]">
			<Link to={"/"}>
				<h1 className="text-[35px]  leading-[40px] font-carosBold sm:col-span-2 lg:row-span-1 md:row-span-1 lg:col-span-1 md-col-span-1 col-start-1 row-span-1">
					The Movie Tracker
				</h1>
			</Link>
			<div
				className={
					"flex gap-[20px] col-span-2 col-start-6 flex-row row-span-1 items-center md:hidden lg:hidden"
				}
			>
				{page === "search" ? (
					<></>
				) : (
					<>
						<div
							onClick={() => {
								setshowSearchBar(true);
							}}
							className={` ${
								showSearchBar ? "hidden " : ""
							} w-[39px] h-[39px] bg-[#D9D9D9] rounded-[30px] flex items-center justify-center text-[20px] cursor-pointer`}
						>
							🔍
						</div>
					</>
				)}
			</div>

			{page === "search" || showSearchBar ? (
				<input
					onKeyDown={handleSubmitSearch}
					onChange={handleInputChange}
					value={searchKeyword}
					type="text"
					placeholder="🔍 Search a movie or a series"
					className="lg:hidden md:hidden mr-[20px] mt-[25px]  col-span-6 h-[52px] outline-none text-center text-[20px] font-roboto font-normal rounded-[30px] bg-[#D9D9D9] text-black"
				/>
			) : (
				<></>
			)}

			<input
				onKeyDown={handleSubmitSearch}
				onChange={handleInputChange}
				type="text"
				value={searchKeyword}
				placeholder="🔍 Search a movie or a series"
				className="hidden lg:block md:block col-span-5 col-start-4 h-[57px] outline-none text-center text-[20px] font-roboto font-normal rounded-[30px] bg-[#D9D9D9] text-black"
			/>
		</div>
	);
}
