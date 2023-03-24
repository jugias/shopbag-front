import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HomeIcon from "@mui/icons-material/Home";

import { Link, useNavigate } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
import { useLogOut } from "../../../Components/hooks/useLogOut";

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const out = useLogOut();

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin/" style={{ textDecoration: "none" }}>
          <img
            src="https://res.cloudinary.com/dr8u3dssn/image/upload/v1651677898/Pink_Yellow_Cute_Bag_Cop_Ecommerce_Shop_Logo_1_v9mvoc.png"
            alt=""
          />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">PRINCIPAL</p>
          <Link to="/admin/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Panel de control</span>
            </li>
          </Link>
          <p className="title">LISTAS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon icon-color" />
              <span>Usuarios</span>
            </li>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Productos</span>
            </li>
          </Link>
          <Link to="/admin/ordenes" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Ordenes</span>
            </li>
          </Link>
          <Link to="/admin/facturas" style={{ textDecoration: "none" }}>
            <li>
              <DescriptionOutlinedIcon className="icon" />
              <span>Facturas</span>
            </li>
          </Link>
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USUARIO</p>
          {/* <li>
						<AccountCircleOutlinedIcon className="icon" />
						<span>Cuenta</span>
					</li> */}

          <li onClick={() => navigate("/")}>
            <HomeIcon className="icon" />
            <span>Inicio</span>
          </li>

          <li onClick={out}>
            <ExitToAppIcon className="icon" />
            <span>Cerrar Sesion</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
