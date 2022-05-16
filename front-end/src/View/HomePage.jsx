import React from "react";
import { Box } from "rebass";
import NavigationBar from "../Components/NavBar";
const HomePage = () => {
	return (
		<>
			<NavigationBar />
			<iframe
				width="560"
				height="315"
				src={"https://www.youtube.com/embed/z60hjdk7Y8c"}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</>
	);
};

export default HomePage;
