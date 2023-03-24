import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/reducer/forgot-password";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  let datos = JSON.parse(localStorage.getItem("emailForRecovery"));
  const [form, setForm] = useState({ email: datos.email, password: "" });
  const [error, setError] = useState({ length: "", validate: false });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.value < 5) {
      setError({ length: "Debe ser mayor a 4 caracteres", validate: false });
    } else {
      setError({ validate: true });
    }
  };
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const change = () => {
    dispatch(changePassword(form));
    swal({
      title: "Contraseña cambiada",
      icon: "success",
      showCloseButton: true,
    }).then(function () {
      navigate("/");
    });
  };
  return (
    <div>
      <div className="container my-5">
        <div className="mb-3 text-center">
          <h3>A continuacion, introduzca su nueva contraseña</h3>
        </div>
        <div>
          <input
            className="form-control my-3"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
          />
          <span className="text-danger">{error.length}</span>
          <button
            disabled={error.validate === false}
            className="btn btn-success"
            onClick={change}
          >
            Cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );
};
