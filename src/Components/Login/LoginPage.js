import React from "react";
import { Login } from "./Login";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export const LoginPage = ({ rute = "/" }) => {
	const navigate = useNavigate();

	const redirect = () => navigate(rute);

	return (
		<div className="loginPageContainer">
			<Login redirect={redirect} page={true} loginClass={"loginPage"} />
		</div>
	);
};
