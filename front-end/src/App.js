import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./View/HomePage";
import ChatRoomPage from "./View/ChatRoomPage";
import LoginPage from "./View/LoginPage";
import SignupPage from "./View/SignupPage";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" exact element={<HomePage />} />
				<Route path="/login" exact element={<LoginPage />} />
				<Route path="/chatpage" exact element={<ChatRoomPage />} />
				<Route path="/signup" exact element={<SignupPage />} />
			</Routes>
		</>
	);
}

export default App;
