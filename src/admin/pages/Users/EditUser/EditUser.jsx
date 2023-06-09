import React, { useEffect, useState } from "react";
import { UpdatePerfil } from "../../../../redux/reducer/perfil";
import { useSelector, useDispatch } from "react-redux";
// import { getResults, results } from "../../redux/reducer/newPassword";
import { getPerfil, getAllInfo } from "../../../../redux/reducer/perfil";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { getAllUsers } from "../../../../redux/reducer/getAllUsers";
import { allUserRegisters } from "../../../../redux/reducer/getAllUsers";

export const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = localStorage.getItem("userCredentials");
  let myPerfil = useSelector(getAllInfo);
  // let resultados = useSelector(results);
  // console.log(resultados);
  let parseGetData = JSON.parse(getData);
  const [editar, setEditar] = useState(false);
  // const [pw, setPw] = useState({});
  // const [pwErrors, setPwErrors] = useState({});
  // const [pwValid, setPwValid] = useState(true);
  let allUser = useSelector(allUserRegisters);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    address: "",
    phone: "",
    firstName: "",
    lastName: "",
    idPersonal: "",
  });
  const [errores, setErrores] = useState({});
  const [validate, setValidate] = useState(true);
  // const handleChangeOnPassW = (e) => {
  // 	setPw({ ...pw, [e.target.name]: e.target.value });
  // };
  // const handleVerifEqualPass = (e) => {
  // 	let passIniti = document.getElementById("password");
  // 	setPw({ ...pw, [e.target.name]: e.target.value });
  // 	if (e.target.value !== passIniti.value) {
  // 		setPwValid(false);
  // 		setPwErrors({ errors: "No coinciden las contraseñas" });
  // 	} else {
  // 		setPwValid(true);
  // 		setPwErrors({ errors: "" });
  // 	}
  // };
  // const lengthNewPass = (e) => {
  // 	setPw({ ...pw, [e.target.name]: e.target.value });
  // 	if (e.target.value.length < 5) {
  // 		setPwValid(false);
  // 		setPwErrors({
  // 			errLength: "La contraseña debe ser mas de 5 caracteres o mas",
  // 		});
  // 	} else {
  // 		setPwValid(true);
  // 		setPwErrors({
  // 			errLength: "",
  // 		});
  // 	}
  // };
  // const handleChagePassword = (e) => {
  // 	e.preventDefault();
  // 	try {
  // 		dispatch(getResults(pw));
  // 	} catch {
  // 		console.log("no se pudo");
  // 	}
  // };
  // console.log(pw);
  const handleOnChangeName = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    let userNombreVerif = allUser.filter(
      (un) => un.userName === e.target.value
    );

    if (userNombreVerif.length > 0) {
      setErrores({ name: "Hay un usuario con este nombre" });
      setValidate(false);
    } else {
      setErrores({ name: "" });
      setValidate(true);
    }
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(getPerfil(parseGetData.token));
    dispatch(getAllUsers());
  }, [dispatch]);
  // console.log(pwErrors);
  const handleEdit = () => {
    setEditar(true);
  };
  const handleAccept = () => {
    if (validate === true) {
      if (form.userName === "") {
        form.userName = myPerfil.userName;
      }
      if (form.email === "") {
        form.email = myPerfil.email;
      }
      if (form.address === "") {
        form.address = myPerfil.address;
      }
      if (form.phone === "") {
        form.phone = myPerfil.phone;
      }
      form.firstName = myPerfil.firstName;
      form.lastName = myPerfil.lastName;
      form.idPersonal = myPerfil.idPersonal;
      let kiko = dispatch(UpdatePerfil(form));
      swal({
        title: "Los cambios han sido efectuados!",
        text: "Recarga la pagina para visualizar los cambios",
        icon: "success",
        button: "Aceptar",
      });
      setEditar(false);
      parseGetData.userName = form.userName;
      localStorage.setItem("userCredentials", JSON.stringify(parseGetData));

      setForm({
        userName: "",
        email: "",
        address: "",
        phone: "",
        firstName: "",
        lastName: "",
      });
    }

    return (
      <div>
        <div className="bg-light my-3">
          <div className="container">
            <div className="d-flex border-bottom col-12 align-items-center">
              <div className="col-6 text-left">
                <h4 className="py-3 ">Perfil de {myPerfil.userName}</h4>
              </div>
              <div className="col-6 text-right">
                <button
                  className=" btn btn-primary"
                  onClick={handleEdit}
                  disabled={editar}
                >
                  <i className="fas fa-edit"></i>Editar datos
                </button>
              </div>
            </div>
            {editar === false ? (
              <div>
                <div className="mx-3 row">
                  <div className="my-3">
                    <h6>Nombre de usuario: {myPerfil.userName}</h6>
                  </div>
                </div>
                <div className="mx-3 row">
                  <div className="my-3">
                    <h6>Correo electronico: {myPerfil.email}</h6>
                  </div>
                </div>
                <div className="mx-3 row">
                  <div className="my-3">
                    <h6>Telefono : {myPerfil.phone}</h6>
                  </div>
                </div>
                <div className="mx-3 row">
                  <div className="my-3">
                    <h6>Direccion: {myPerfil.address}</h6>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAccept} className="mt-2 mx-4 g-3">
                <p>Deja en blanco aquello que quieres mantener</p>
                <p className="py-1 text-danger">{errores.name}</p>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Nombre de usuario
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                      name={"userName"}
                      value={form.userName}
                      onChange={handleOnChangeName}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Correo Electronico
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="inputPassword"
                      name={"email"}
                      value={form.email}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Direccion
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                      name={"address"}
                      value={form.address}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Nº de Telefono
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword"
                      name={"phone"}
                      value={form.phone}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className=" my-3 col-12 text-center">
                  <button
                    type="submit"
                    disabled={!validate}
                    className=" col-2 btn btn-success text-light"
                  >
                    Aceptar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="col-6 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="btn text-light btn-danger"
          >
            <i className="fas fa-arrow-left"></i> Regresar
          </button>
        </div>
      </div>
    );
  };
};
