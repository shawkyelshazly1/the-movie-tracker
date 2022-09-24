import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppAlertContext } from "../AppAlertContext";
import FormInput from "../components/FormInput";
import api from "../utils/api";
import { registerUser } from "../utils/APIs/authAPIs";

export default function Register() {
	const { setAlertType, setAlertData } = useContext(AppAlertContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleAlert = (type, data) => {
		setAlertData(data);
		setAlertType(type);
	};

	const handleFormSubmit = (e) => {
		handleAlert("", "");
		e.preventDefault();

		// send data to register on server and handle response
		registerUser(formData, handleAlert).then((res) => {
			if (res.status === 200) {
				handleAlert(
					"success",
					"User Registered Successfully, You will be redirected to login page"
				);

				setTimeout(function () {
					// Code to run after the pause
					navigate("/");
					handleAlert("", "");
				}, 3000);
			}
		});
	};

	return (
		<div className="w-full h-full flex flex-col items-center pt-[81px] md:pt-0 smd:pt-0  lg:pt-0 px-[21px] md:px-[40px] smd:px-[40px] lg:px-[40px] smd:justify-center md:justify-center lg:justify-center">
			<h1 className="text-[90px] w-fit leading-[80px] font-carosBold md:w-[410px] smd:w-[410px] lg:w-[410px] lg:pl-[35px] smd:pl-[35px] md:pl-[35px]">
				The Movie Tracker
			</h1>
			<form
				onSubmit={handleFormSubmit}
				className="relative flex flex-col w-full  gap-[17px] mt-[47px] md:w-[400px] smd:w-[400px] lg:w-[400px]"
			>
				<FormInput
					type="text"
					name="username"
					placeholder="Username"
					handleInputChange={handleInputChange}
				/>
				<FormInput
					type="email"
					name="email"
					placeholder="Email Address"
					handleInputChange={handleInputChange}
				/>
				<FormInput
					type="password"
					name="password"
					placeholder="Password"
					handleInputChange={handleInputChange}
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					handleInputChange={handleInputChange}
				/>

				<button
					className="text-[25px] mt-[30px] bg-[#37C6F3] h-[53px] rounded-[20px] text-white font-roboto font-semibold"
					type="submit"
				>
					Register
				</button>
				<p className="ml-[11px] text-[#6D6D6D] font-roboto text-[15px] mt-[-2px] ">
					Already have an account? ,{" "}
					<Link to={"/"}>
						<span className="font-bold">Login</span>
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
