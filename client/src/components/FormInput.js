import React from "react";

export default function FormInput({ type, name, placeholder }) {
	return (
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			required
			className="outline-none w-full text-center text-[20px] bg-[#D9D9D9] rounded-[20px] h-[53px] text-black items-center "
		/>
	);
}
