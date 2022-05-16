import NavBar from "../Components/NavBar";
import { Box } from "rebass";
// function LoginPage() {
// 	return (
// 		<>
// 			<NavBar />
// 			LoginPage
// 		</>
// 	);
// }
import "../App.css";
import React, { Component } from "react";
const LoginPage = () => {
	return (
		<>
			<NavBar />
			<Box
				sx={{
					maxWidth: 512,
					mx: "auto",
					px: 3,
				}}
			>
				<div className="loginpage">
					<form>
						<h3>Sign In</h3>
						<div className="mb-3">
							<label>Email address</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter email"
							/>
						</div>
						<div className="mb-3">
							<label>Password</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter password"
							/>
						</div>
						<div className="mb-3">
							<div className="custom-control custom-checkbox">
								<input
									type="checkbox"
									className="custom-control-input"
									id="customCheck1"
								/>
								<label className="custom-control-label" htmlFor="customCheck1">
									Remember me
								</label>
							</div>
						</div>
						<div className="d-grid">
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</div>
						<p className="forgot-password text-right">
							Forgot <a href="#">password?</a>
						</p>
					</form>
				</div>
			</Box>
		</>
	);
};
export default LoginPage;
