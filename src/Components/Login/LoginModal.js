import React, { useEffect, useState } from "react";
import { Login } from "./Login";

export const LoginModal = ({ buttonClass = "", styles = {} }) => {
  const [band, setBand] = useState(true);

  useEffect(() => {
    document
      .getElementById("loginModal")
      .addEventListener("hidden.bs.modal", (e) => {
        setBand(false);
      });

    document
      .getElementById("loginModal")
      .addEventListener("show.bs.modal", (e) => {
        setBand(true);
      });
  }, []);

  return (
    <>
      <button
        type="button"
        className={"btn " + buttonClass}
        style={styles}
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        <i className="fas fa-sign-in-alt signin"></i>
        <span className="siginWord"> Iniciar Sesión</span>
      </button>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Iniciar Sesión
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{band && <Login />} </div>
          </div>
        </div>
      </div>
    </>
  );
};
