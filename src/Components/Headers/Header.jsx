import React from "react";
import Enlaces from "./Enlaces";
import SearchBar from "./SearchBar";

import "./Header.css";
import logo from "./LogoEcommerce.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header col-12 d-flex py-2 align-items-center p-0">
        <div className="col-xl-4 col-lg-4 col-sm-1 col-1  d-flex align-items-center">
          <Link to="/">
            <img src={logo} alt="no hay imagen" height={"50px"}/>
          </Link>
          <Link to="/" className="titulo  text-light">
            <h5 className="m-0 pr-5">ShopBag</h5>
          </Link>
        </div>
        <div className="col-xl-4 col-lg-4 col-sm-5 col-6 searchBarjsx ">
          <SearchBar />
        </div>
        <div className="col-xl-4 col-lg-4 col-sm-6 col-5 ">
          <Enlaces />
        </div>
      </div>
    </header>
  );
};
export default Header;
