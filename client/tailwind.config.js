const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				carosBold: ["FONTSPRING-DEMO-CAROS-BOLD", "sans-serif"],
				roboto: ["Roboto", "sans-serif"],
			},
		},
		screens: {
			sm: "576px",
			// => @media (min-width: 576px) { ... }
			smd: "769px",
			// => @media (min-width: 769px) { ... }
			md: "960px",
			// => @media (min-width: 960px) { ... }

			lg: "1440px",
			// => @media (min-width: 1440px) { ... }
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				/* Hide scrollbar for Chrome, Safari and Opera */
				".no-scrollbar::-webkit-scrollbar": {
					display: "none",
				},

				/* Hide scrollbar for IE, Edge and Firefox */
				".no-scrollbar": {
					"-ms-overflow-style": "none" /* IE and Edge */,
					"scrollbar-width": "none" /* Firefox */,
				},
			});
		}),
	],
};
