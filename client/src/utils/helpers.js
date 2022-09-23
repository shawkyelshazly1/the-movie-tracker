exports.setAccessToken = (accessToken) => {
	localStorage.setItem("accessToken", accessToken);
};

exports.getTMDBImageUrl = (imagePath) => {
	return `https://image.tmdb.org/t/p/original/${imagePath}`;
};
