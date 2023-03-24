import React, { useState, useEffect } from "react";
import "./Header.css";

import { LoginModal } from "../Login/LoginModal";
import { UserDropDown } from "../hooks/UserDropDown";

//hook que devuelve un state que comprueba si hay alguien logeado
import { useSelector, useDispatch } from "react-redux";
import {
  getShoppingCart,
  getShoppingCartGuest,
} from "../../redux/reducer/shoppingCart";

import { Link, useNavigate } from "react-router-dom";
import { rootVerification } from "../../redux/reducer/login";

const Enlaces = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(true);
  const [admin, setAdmin] = useState(false);
  const userCredentials = useSelector(({ login }) => login.userCredentials);

  const shoppingList = useSelector(
    ({ shoppingCart }) => shoppingCart.shoppingList
  );

  useEffect(() => {
    if (userCredentials.userName || localStorage.getItem("userCredentials")) {
      setLogin(true);
      dispatch(getShoppingCart());
      dispatch(rootVerification()).then((data) => {
        data.payload ? setAdmin(true) : setAdmin(false);
      });
    } else setLogin(false);
  }, [dispatch, userCredentials]);

  const redirectShoppingCart = () => {
    login
      ? dispatch(getShoppingCart()).then(() => navigate("/cart"))
      : dispatch(
          getShoppingCartGuest(JSON.parse(localStorage.getItem("shoppingCart")))
        ).then(() => navigate("/cart"));
  };

  return (
    <div className="enlaces align-items-center col text-center w-100 d-flex justify-content-between">
      <div className=" toggle  ">
        {login ? (
          <>
            {admin ? (
              <Link to="/admin">
                <button
                  type="button"
                  className={"btn registrarse btn text-white"}
                >
                  <i className="fas fa-chart-line iconAdmin"></i>
                  <span className="panelAdmin"> Panel-Admin</span>
                </button>
              </Link>
            ) : (
              <></>
            )}
            <UserDropDown />
          </>
        ) : (
          <LoginModal buttonClass={"registrarse btn text-white"} />
        )}
      </div>

      <div className="col-6 shoppingKart d-flex justify-content-start">
        <div>
          <button
            className="nav-link btn text-white position-relative"
            onClick={redirectShoppingCart}
          >
            <i className="fas fa-shopping-cart "></i>
            <span className="spankart"> Carrito</span>
            <span
              className="shoppingCounter"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                // backgroundColor: '#A85CF9',
                backgroundColor: "red",

                color: "white",
                position: "absolute",
                top: 0,
                right: 0,
                width: "22px",
                height: "22px",
                borderRadius: "50%",
              }}
            >
              {shoppingList.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Enlaces;
