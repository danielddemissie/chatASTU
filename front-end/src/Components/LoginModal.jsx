import React from "react";
import { Link } from "react-router-dom";

const LoginModal = () => {
	return (
		<div>
			<button
				type="button"
				className="btn btn-primary"
				data-toggle="modal"
				data-target="#exampleModal"
				data-whatever="@mdo"
			>
				LogIn
			</button>

			<div
				className="modal fade"
				id="exampleModal"
				tabindex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								LogIn
							</h5>
							<button
								type="button"
								className="close btn-danger"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label for="recipient-name" className="col-form-label">
										Email:
									</label>
									<input
										type="text"
										className="form-control"
										id="recipient-name"
									/>
								</div>
								<div className="form-group">
									<label for="recipient-name" className="col-form-label">
										Password:
									</label>
									<input
										type="text"
										className="form-control"
										id="recipient-name"
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal"
							>
								Close
							</button>
							<Link to="/userpage">
								<button type="button" className="btn btn-primary">
									LogIn
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
