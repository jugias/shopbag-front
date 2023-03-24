import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { sendNotification } from "../../../utils/notifications";

const Widget = ({ type, socket }) => {
  const [metric, setMetric] = useState({ amount: 0 });

  let data;

  useEffect(() => {
    sendNotification(type).then(({ data }) => {
      setMetric({ amount: data.response });
    });
  }, [type]);

  switch (type) {
    case "usersQuantity":
      data = {
        title: "Usuarios",
        isMoney: false,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              width: "2em",
              height: "2em",
            }}
          />
        ),
      };

      socket.on("usersQuantity", (data) => {
        setMetric((state) => ({ ...state, amount: data }));
      });

      break;
    case "ordersQuantity":
      data = {
        title: "Ordenes",
        isMoney: false,
        // link: 'Ver mas',
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
              width: "2em",
              height: "2em",
            }}
          />
        ),
      };

      socket.on("ordersQuantity", (data) => {
        setMetric((state) => ({ ...state, amount: data }));
      });

      break;
    case "salesQuantity":
      data = {
        title: "Ventas",
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
              width: "2em",
              height: "2em",
            }}
          />
        ),
      };

      socket.on("salesQuantity", (data) => {
        setMetric((state) => ({ ...state, amount: data }));
      });

      break;
    case "profitAmount":
      data = {
        title: "Ganancias",
        isMoney: true,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
              width: "2em",
              height: "2em",
            }}
          />
        ),
      };

      socket.on("profitAmount", (data) => {
        setMetric((state) => ({ ...state, amount: data }));
      });

      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {metric.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {/* <div className='percentage positive'>
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
