import React, { useContext, useState } from "react";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { AppAlertContext } from "../AppAlertContext";
import api from "../utils/api";
import { CurrentUserContext } from "../CurrentUserContext";
import { setAccessToken } from "../utils/helpers";

export default function Login() {
	const { setAlertType, setAlertData } = useContext(AppAlertContext);
	const { setCurrentUser } = useContext(CurrentUserContext);
	const navigate = useNavigate();

	// formData state
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// handle input change
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// handle alert
	const handleAlert = (type, data) => {
		setAlertData(data);
		setAlertType(type);
	};

	const handleFormSubmit = (e) => {
		handleAlert("", "");
		e.preventDefault();

		// call login api to login user and save token
		api
			.post("/auth/login", formData)
			.then((res) => {
				// handle response 200 logged in
				if (res.status === 200) {
					console.log(res.data);
					handleAlert("success", "Logged In Successfully.");

					// saving accessToken to storage
					setAccessToken(res.data.accessToken);
					setCurrentUser(res.data.user);
					setTimeout(function () {
						// Code to run after the pause
						navigate("/");
						handleAlert("", "");
					}, 1500);
				}
			})
			.catch((err) => {
				// handle showing modal alert for errors with messages
				if (err.response.status === 403 || 422) {
					handleAlert(
						"error",
						err.response.data.errors || [err.response.data.error]
					);
				} else {
					// handle other server errors
					handleAlert("error", "Something Went Wrong!");
				}
			});
	};

	return (
		<div className="w-full h-full flex flex-col items-center pt-[81px] smd:pt-0 md:pt-0 lg:pt-0 px-[21px] md:px-[40px] smd:px-[40px] lg:px-[40px] md:justify-center smd:justify-center lg:justify-center">
			<h1 className="text-[90px] w-fit leading-[80px] font-carosBold md:w-[410px] smd:w-[410px] lg:w-[410px] lg:pl-[35px] md:pl-[35px] smd:pl-[35px]">
				The Movie Tracker
			</h1>
			<form
				onSubmit={handleFormSubmit}
				className="relative flex flex-col w-full  gap-[17px] mt-[47px] md:w-[400px] smd:w-[400px] lg:w-[400px]"
			>
				<FormInput
					handleInputChange={handleInputChange}
					type="text"
					name="username"
					placeholder="Username"
				/>
				<FormInput
					handleInputChange={handleInputChange}
					type="password"
					name="password"
					placeholder="Password"
				/>

				<button
					className="text-[25px] mt-[30px] bg-[#37C6F3] h-[53px] rounded-[20px] text-white font-roboto font-semibold"
					type="submit"
				>
					Login
				</button>
				<p className="ml-[11px] text-[#6D6D6D] font-roboto text-[15px] mt-[-2px] ">
					You don’t have an account? ,{" "}
					<Link to={"/register"}>
						<span className="font-bold">SignUp</span>
					</Link>
				</p>
			</form>

			<h1 className="absolute  bottom-[13px] text-[15px] font-roboto font-bold">
				Built with ❤️ by{" "}
				<a href="http://www.elshazlii.com" target="_blank" rel="noreferrer">
					Elshazlii
				</a>
			</h1>
		</div>
	);
}
