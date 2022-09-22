import React from "react";
import FormInput from "../components/FormInput";

export default function Register() {
	const handleFormSubmit = (e) => {
		e.preventDefault();
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
				<FormInput type="text" name="username" placeholder="Username" />
				<FormInput type="email" name="email" placeholder="Email Address" />
				<FormInput type="password" name="password" placeholder="Password" />
				<FormInput
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
				/>

				<button
					className="text-[25px] mt-[30px] bg-[#37C6F3] h-[53px] rounded-[20px] text-white font-roboto font-semibold"
					type="submit"
				>
					Login
				</button>
				<p className="ml-[11px] text-[#6D6D6D] font-roboto text-[15px] mt-[-2px] ">
					Already have an account? , <span className="font-bold">Register</span>
				</p>
			</form>

			<h1 className="absolute  bottom-[13px] text-[15px] font-roboto font-bold">
				Built with ❤️ by{" "}
				<a href="http://www.elshazlii.com" target="_blank">
					Elshazlii
				</a>
			</h1>
		</div>
	);
}
