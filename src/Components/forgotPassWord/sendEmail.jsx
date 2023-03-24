import React, { useState } from "react";
import { sendEmail, myData } from "../../redux/reducer/forgot-password";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import "./sendEmail.css";

export const SendEmail = () => {
  const [email, setEmail] = useState({ email: "" });
  const [error, setError] = useState({ error: "", validate: false });
  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: [e.target.value] });
    let emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(e.target.value)) {
      setError({
        error: "No es un formato de correo electronico",
        validate: false,
      });
    } else {
      setError({ error: "", validate: true });
    }
  };
  let mydatos = useSelector(myData);
  const dispatch = useDispatch();
  const handlerSendEmail = () => {
    dispatch(sendEmail(email));
    swal({
      title: "Correo enviado",
      icon: "success",
      showCloseButton: true,
    });
  };
  return (
    <div className="container my-4">
      <div className="text-center mb-4">
        <h3>Proceso de reelaboracion de contraseña</h3>
      </div>
      <div className="contenido text-center">
        <h5>
          En el recuadro de abajo, escriba el email con el que te registraste.
          Luego ve al correo que te mandaremos y sigue las instrucciones
        </h5>
        <input
          type="email"
          className="inputmail form-control mt-3"
          value={email.email}
          onChange={handleChange}
          name="email"
        ></input>
        <span className="text-danger mt-3">{error.error}</span>
        <div>
          <button
            onClick={handlerSendEmail}
            disabled={error.validate === false}
            className=" miBoton my-4 text-light btn btn-info"
          >
            Enviar correo
          </button>
        </div>
      </div>
    </div>
  );
};
