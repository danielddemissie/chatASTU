import { ClassNames } from "@emotion/react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./View/HomePage";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LoginModal from "./Components/LoginModal";
import UserPage from "./View/UserPage";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" exact element={<HomePage />} />
				<Route path="/userpage" exact element={<UserPage />} />
			</Routes>
		</>
	);
}

export default App;
