import React from "react";

export default function AlertComponent({ type, data }) {
	switch (type) {
		case "info":
			return (
				<div className="w-full absolute top-5 font-medium font-roboto">
					<div
						className=" w-fit mx-auto top-5  bg-blue-100 rounded-lg py-5 px-8 mb-4 text-base text-blue-700 "
						role="alert"
					>
						{data}
					</div>
				</div>
			);
		case "success":
			return (
				<div className="w-full absolute top-5 font-medium font-roboto">
					<div
						className="  w-fit mx-auto top-5 bg-green-100 rounded-lg py-5 px-8 mb-4 text-base text-green-700  "
						role="alert"
					>
						{data}
					</div>
				</div>
			);
		case "error":
			return (
				<div className="w-full absolute top-5 font-medium font-roboto">
					<div
						className="  w-fit mx-auto top-5  bg-red-100 rounded-lg py-5 px-8 mb-4 text-base text-red-700 "
						role="alert"
					>
						<ul className="list-disc">
							{data.map((error, i) =>
								error.instancePath ? (
									<li key={i}>
										<span className="font-bold">
											{error.instancePath.slice(1)}
										</span>
										: {error.message}
									</li>
								) : (
									<li key={i}>{error}</li>
								)
							)}
						</ul>
					</div>
				</div>
			);

		default:
			return (
				<div className="w-full absolute top-5 font-medium font-roboto">
					<div
						className="relative  w-fit mx-auto top-5  bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 "
						role="alert"
					>
						{data}
					</div>
				</div>
			);
	}
}
