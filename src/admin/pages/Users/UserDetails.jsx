import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserDetails.css";
import { Link, useParams } from "react-router-dom";

import { allUserRegisters } from "../../../redux/reducer/getAllUsers";
import { putUserBan } from "../../../redux/reducer/userBan";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { EditDatos } from "./editarDatos/EditDatos";

export const UserDetails = () => {
  //trae todas las ordenes
  let userAll = useSelector(allUserRegisters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //filtro por el numero de orden
  const { userId } = useParams();
  const filterUserbyID = userAll.filter((e) => e.id === userId);

  const [data] = useState(filterUserbyID[0]);
  const handleBan = () => {
    dispatch(putUserBan({ id: data.id }));

    Swal.fire({
      icon: "success",
      title: "Tarea completada",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/admin/users");
  };

  const handleEdit = () => {
    <Link to="edit" />;
  };

  return (
    <div className="userDetail__container">
      <div className="userDetail__container-list">
        <div className="orderDetail__header">
          <h1>Detalle del usuario: {data.userName}</h1>
        </div>
        <div className="userDetail__container-item">
          <h3 className="title__list">ID</h3>
          <div className="list__item">{data.id} </div>
        </div>
        <hr className="divider" />
        <div className="userDetail__container-item">
          <h3 className="title__list">Username</h3>
          <div className="list__item">{data.userName} </div>
        </div>
        <hr className="divider" />
        <div className="userDetail__container-item">
          <h3 className="title__list">Documento de Identidad</h3>
          <div className="list__item">{data.idPersonal} </div>
        </div>
        <hr className="divider" />
        <div className="userDetail__container-item">
          <h3 className="title__list">Fecha de creacion</h3>
          <div className="list__item">{data.createdAt} </div>
        </div>
        <hr className="divider" />
        <div className="userDetail__container-item">
          <h3 className="title__list">Email</h3>
          <div className="list__item">{data.email} </div>
        </div>
        <hr className="divider" />
        <div className="userDetail__container-item">
          <h3 className="title__list">Nombre completo</h3>
          <div className="list__item">
            {data.firstName} {data.lastName}{" "}
          </div>
        </div>
        <hr className="divider" />
        <div className="userDetail__container-item">
          <h3 className="title__list">Telefono</h3>
          <div className="list__item">{data.phone} </div>
        </div>
        <hr className="divider" />

        <div className="userDetail__container-item">
          <h3 className="title__list">Baneado</h3>
          <div className="list__item">
            {data.banned === false ? "No" : "Si"}{" "}
          </div>
        </div>
        <hr className="divider" />
        <div className="userDetail__container-item">
          <h3 className="title__list">Rol</h3>
          <div className="list__item">{data.role.title} </div>
        </div>
        <div className="userDetail__buttonContainer">
          <button
            className="btn btn-color"
            data-bs-toggle="modal"
            data-bs-target="#cambioDeDatos"
          >
            Editar
          </button>
          <button className="btn btn-color" onClick={handleBan}>
            Bannear
          </button>
        </div>
      </div>
      {/* modal cambio de datos de usuario */}
      <div
        className="modal fade"
        id="cambioDeDatos"
        tabIndex="-1"
        aria-labelledby="cambioDeDatos"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cambioDeDatos">
                Cambio de datos del Ususario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleEdit}
              ></button>
            </div>
            <div className="modal-body">
              <EditDatos
                firstName={data.firstName}
                lastName={data.lastName}
                email={data.email}
                direccion={data.address}
                tlf={data.phone}
                userName={data.userName}
                idUser={data.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
