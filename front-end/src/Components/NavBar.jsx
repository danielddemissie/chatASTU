import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function NavigationBar() {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-dark">
				<div className="container-fluid">
					<button
						className="navbar-toggler"
						type="button"
						data-mdb-toggle="collapse"
						data-mdb-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i className="fas fa-bars"></i>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<a className="navbar-brand mt-2 mt-lg-0" href="#">
							<img
								src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
								height="15"
								alt="MDB Logo"
								loading="lazy"
							/>
						</a>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item  text-light">
								<a className="nav-link" href="#">
									Home
								</a>
							</li>
							<li className="nav-item  text-light">
								<a className="nav-link" href="#">
									About
								</a>
							</li>
							<li className="nav-item  text-light">
								<a className="nav-link" href="#">
									Contact
								</a>
							</li>
						</ul>
					</div>

					<div className="d-flex align-items-center">
						<div className="">
							<LoginModal />
						</div>
						<div style={{ width: "10px" }}></div>
						<div className="ml-4">
							<SignupModal />
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
