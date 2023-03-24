import React, { useState, useEffect } from "react";
// import Logo from '../Home/img/faviconBag.png';
import Logo from "../../../../Components/Home/img/faviconBag.png";

import {
	userRegister,
	cleanUserResponse,
} from "../../../../redux/reducer/userPost";
import { useDispatch, useSelector } from "react-redux";
// import { LoginFromGoogle } from '../../../../hooks/LoginFromGoogle';
// import { LoginFromFacebook } from '../hooks/LoginFromFacebook';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Form = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userResponse = useSelector(({ userPost }) => userPost.userResponse);

	const [form, setForm] = useState({});

	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		if (userResponse.loading) {
			Swal.fire({
				title: "Cargando...",
				timerProgressBar: true,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		}

		if (userResponse.error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				showConfirmButton: false,
				timer: 1000,
			});

			setFormErrors({});
			userResponse.errors.forEach((error) => {
				setFormErrors((state) => ({
					...state,
					[error.param]: error.msg,
				}));
			});
		}

		if (userResponse.success) {
			Swal.fire({
				icon: "success",
				title: "Registro Completo.",
				showConfirmButton: false,
				timer: 1500,
			});

			navigate("/admin/users");
		}
	}, [dispatch, navigate, userResponse]);

	useEffect(() => {
		return () => {
			dispatch(cleanUserResponse());
		};
	}, [dispatch]);

	const handleOnchangeActivity = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const handleOnSubmit = (event) => {
		event.preventDefault();
		dispatch(userRegister(form));
	};

	return (
		<div id="formUser">
			<div className="formHeader">
				<img className="icono" src={Logo} alt="logo" />

				<h2>Formulario de Registro </h2>
				<p>Sus futuros productos los espera en ShopBag</p>
			</div>

			<form
				onSubmit={handleOnSubmit}
				className="container"
				autoComplete="off"
			>
				<div className="row">
					<div className="col-md-12">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-envelope"></i>
							</span>
							<input
								type="email"
								name="email"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.email && "is-invalid")
								}
								placeholder="Correo electrónico."
								required
							/>

							<div className="invalid-feedback">
								{formErrors.email}
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-lock"></i>
							</span>
							<input
								type="password"
								name="password"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.password && "is-invalid")
								}
								placeholder="Contraseña."
								required
							/>

							<div className="invalid-feedback">
								{formErrors.password}
							</div>
						</div>
					</div>

					<div className="col-md-6">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-lock"></i>
							</span>
							<input
								type="password"
								name="passwordConfirmation"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.passwordConfirmation &&
										"is-invalid")
								}
								placeholder="Confirme su contraseña."
								required
							/>

							<div className="invalid-feedback">
								{formErrors.passwordConfirmation}
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-user"></i>
							</span>
							<input
								type="text"
								name="userName"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.userName && "is-invalid")
								}
								placeholder="Nombre de usuario."
								required
							/>

							<div className="invalid-feedback">
								{formErrors.userName}
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-user-circle"></i>
							</span>
							<input
								type="text"
								name="firstName"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.firstName && "is-invalid")
								}
								placeholder="Nombres."
							/>

							<div className="invalid-feedback">
								{formErrors.firstName}
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-user-circle"></i>
							</span>
							<input
								type="text"
								name="lastName"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.lastName && "is-invalid")
								}
								placeholder="Apellidos."
								required
							/>

							<div className="invalid-feedback">
								{formErrors.lastName}
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-phone"></i>
							</span>
							<input
								type="text"
								name="phone"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.phone && "is-invalid")
								}
								placeholder="Numero de celular."
							/>

							<div className="invalid-feedback">
								{formErrors.phone}
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-address-book"></i>
							</span>
							<input
								type="text"
								name="idPersonal"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.idPersonal && "is-invalid")
								}
								placeholder="ID de Identificacion"
								required
							/>

							<div className="invalid-feedback">
								{formErrors.idPersonal}
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="input-group has-validation">
							<span className="input-group-text">
								<i className="fas fa-map-marked-alt"></i>
							</span>
							<input
								type="text"
								name="address"
								onChange={handleOnchangeActivity}
								className={
									"form-control " +
									(formErrors.address && "is-invalid")
								}
								placeholder="Dirección."
							/>

							<div className="invalid-feedback">
								{formErrors.address}
							</div>
						</div>
					</div>
				</div>

				<div className="loginsContainer">
					<button type="submit" className="btn btn-primary">
						Registrarse
					</button>

					{/* <LoginFromGoogle />
          <LoginFromFacebook />
          <a href='/login' className='text-decoration-none'>
            ¿Ya tienes una cuenta? Haz click Aqui!
          </a> */}
				</div>
			</form>
		</div>
	);
};
