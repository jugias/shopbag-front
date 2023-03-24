import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<footer className="bg-light text-center footer__main " style={{ marginTop: 'auto' }} >
			<div className="footer__section">
				{/* <div className="footer__col">
					<span>Registrate gratis</span>
					<Link to="/registro">
						<button className="btn btn-primary btn-rounded">
							INICIAR SESIÓN
						</button>
					</Link>
				</div> */}
				<div >
					<div>
						<span>Siguenos en nuestras redes sociales</span>
					</div>
					<div>
						<i className="fab fa-facebook" onClick={()=>{window.location.href = "https://www.facebook.com/"}}></i>
						<i className="fab fa-instagram" onClick={()=>{window.location.href = "https://www.instagram.com/"}}></i>
						<i className="fab fa-github" onClick={()=>{window.location.href = "https://www.github.com/"}}></i>
						<i className="fab fa-twitter" onClick={()=>{window.location.href = "https://www.twitter.com/"}}></i>
					</div>
				</div>
			</div>
			<div className="foot__copyrigth">
				<p className="footer__p">
					2022 Copyrigth: Grupo PF 10 Bootcamp Henry
				</p>
			</div>
		</footer>
	);
};
