import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./OrderDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { allOrdersRegisters } from "../../../../redux/reducer/getAllOrders";

export const OrderDetails = () => {
  const navigate = useNavigate();

  //trae todas las ordenes
  let orderAll = useSelector(allOrdersRegisters);
  //filtro por el numero de orden
  const { productId } = useParams();
  const filterOrderbyNumberProduct = orderAll.filter(
    (e) => e.orderNumber === parseInt(productId)
  );

  const [data] = useState(filterOrderbyNumberProduct[0]);
  const handleRegresar = () => {
    navigate("/admin/ordenes");
  };

  return (
    <div className="orderDetail__container">
      <div className="orderDetail__container-list">
        <div className="orderDetail__header">
          <h1>Detalle de la orden # {data.orderNumber}</h1>
        </div>
        <div className="orderDetail__container-item">
          <h3 className="title__list">ID</h3>
          <div className="list__item">{data.id} </div>
        </div>
        <hr className="divider" />
        <div className="orderDetail__container-item">
          <h3 className="title__list">Fecha de compra</h3>
          <div className="list__item">{data.orderDate} </div>
        </div>
        <hr className="divider" />
        <div className="orderDetail__container-item">
          <h3 className="title__list">Id de facturacion</h3>
          <div className="list__item">{data.invoiceId} </div>
        </div>
        <hr className="divider" />
        <div className="orderDetail__container-item">
          <h3 className="title__list">Numero de orden</h3>
          <div className="list__item">{data.orderNumber} </div>
        </div>
        <hr className="divider" />
        <div className="orderDetail__container-item">
          <h3 className="title__list">Cantidad</h3>
          <div className="list__item">{data.quantity} </div>
        </div>
        <hr className="divider" />

        <div className="orderDetail__container-item">
          <h3 className="title__list">Estado</h3>
          <div className="list__item">{data.status} </div>
        </div>
        <hr className="divider" />
        <div className="orderDetail__container-item">
          <h3 className="title__list">Total facturado</h3>
          <div className="list__item">{data.total} </div>
        </div>
        <hr className="divider" />
        <div className="orderDetail__container-item">
          <h3 className="title__list">Comprador</h3>
          <div className="list__item">
            {" "}
            {data.user.firstName} {data.user.lastName}{" "}
          </div>
        </div>
        <button className="btn btn-color" onClick={handleRegresar}>
          Regresar
        </button>
      </div>
    </div>
  );
};
