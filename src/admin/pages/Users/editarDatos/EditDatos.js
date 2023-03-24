import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input } from "../../../../Components/createProduct/Input";
import { getAllUsers } from "../../../../redux/reducer/getAllUsers";
import "./editDatos.css";

export const EditDatos = ({
  firstName,
  lastName,
  email,
  direccion,
  tlf,
  userName,
  idUser,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState({ value: firstName, valid: null });
  const [apellido, setApellido] = useState({ value: lastName, valid: null });
  const [correo, setCorreo] = useState({ value: email, valid: null });
  const [adress, setAdress] = useState({ value: direccion, valid: null });
  const [telefono, setTelefono] = useState({ value: tlf, valid: null });
  const [userN, setUser] = useState({ value: userName, valid: null });

  const regex = {
    name: /^.{1,50}$/,
    apellido: /^.{1,50}$/,
    correo: /^.{1,50}$/,
    adress: /^.{1,50}$/,
    telefono: /^.{1,50}$/,
    userN: /^.{1,50}$/,
  };

  const handleEditUSer = async (e) => {
    e.preventDefault();
    try {
      if (
        name.valid === true &&
        apellido.valid === true &&
        correo.valid === true &&
        adress.valid === true &&
        telefono.valid === true &&
        userN.valid === true
      ) {
        const formData = {
          firstName: name.value,
          lastName: apellido.value,
          email: correo.value,
          address: adress.value,
          phone: telefono.value,
          userName: userN.value,
          id: idUser,
        };
        // enviar post para la creacion en db
        const user = {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("userCredentials"))
              .token,
          },
        };
        await axios.put("/api/user", formData, user);
        //alert de exito
        dispatch(getAllUsers());
        swal("Exito!", `se cambiaron los datos correctamente`, "success");
        navigate("/admin/users");
      } else {
        swal("Error!", `por favor llene los datos correctamente`, "error");
      }
    } catch (error) {
      swal("Error!", `No se pudieron cambiar los datos`, "error");
    }
  };
  return (
    <form
      onSubmit={handleEditUSer}
      className="editDatos__form create__formBody"
    >
      <div className="row">
        <Input
          type="text"
          label="Nombre"
          placeholder="N/A"
          state={name}
          setstate={setName}
          msgError="Debe tener menos de 50 caracteres"
          size="col"
          validRegex={regex.name}
        />
        <Input
          type="text"
          label="Apellido"
          placeholder="N/A"
          state={apellido}
          setstate={setApellido}
          msgError="Debe tener menos de 50 caracteres"
          size="col"
          validRegex={regex.apellido}
        />
      </div>
      <div className="row">
        <Input
          type="text"
          label="Correo Electronico"
          placeholder="N/A"
          state={correo}
          setstate={setCorreo}
          msgError="Debe tener menos de 50 caracteres"
          size="col"
          validRegex={regex.correo}
        />
        <Input
          type="text"
          label="Direccion"
          placeholder="N/A"
          state={adress}
          setstate={setAdress}
          msgError="Debe tener menos de 50 caracteres"
          size="col"
          validRegex={regex.adress}
        />
      </div>
      <div className="row">
        <Input
          type="text"
          label="Telefono"
          placeholder="N/A"
          state={telefono}
          setstate={setTelefono}
          msgError="Debe tener menos de 50 caracteres"
          size="col"
          validRegex={regex.telefono}
        />
        <Input
          type="text"
          label="Nombre de ususario"
          placeholder="N/A"
          state={userN}
          setstate={setUser}
          msgError="Debe tener menos de 50 caracteres"
          size="col"
          validRegex={regex.userN}
        />
      </div>

      <button
        type="submit"
        className="create__button btn btn-color"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        Cambiar datos
      </button>
    </form>
  );
};
