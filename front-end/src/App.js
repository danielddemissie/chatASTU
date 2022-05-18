<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './View/HomePage';
import UserPage from './View/UserPage';
import 'semantic-ui-css/semantic.min.css';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/userpage" exact element={<UserPage />} />
      </Routes>
    </div>
  );
=======
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
>>>>>>> 25d4843801c2271fe9b3b02a465d0005ca7247cf
}

export default App;
