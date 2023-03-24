import "./featured.scss";
import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import isBetween from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { sendNotification } from "../../../utils/notifications";

dayjs.locale("es");
dayjs.extend(localeData);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

const Featured = ({ socket }) => {
  const [saleReport, setSaleReport] = useState({
    todaySale: 0,
    objective: 5000,
    percentage: 0,
    date: dayjs().format().substring(0, 10),
    weekSale: 0,
    monthSale: 0,
  });

  const dateBetween = (date, unit) => {
    const init = dayjs().subtract(1, unit).startOf(unit);
    const end = init.endOf(unit);

    return (
      date >= init.format().substring(0, 10) &&
      date <= end.format().substring(0, 10)
    );
  };

  const saleByDate = (data, unit) =>
    data
      .reduce((a, b) => (dateBetween(b.date, unit) ? a + b.total : a), 0)
      .toFixed(2);

  useEffect(() => {
    sendNotification("salesReport").then(({ data: { response } }) => {
      if (saleReport.date === response[0].date) {
        setSaleReport((state) => ({
          ...state,
          todaySale: response[0].total,
          percentage: ((response[0].total * 100) / state.objective).toFixed(2),
          weekSale: saleByDate(response, "week"),
          monthSale: saleByDate(response, "month"),
        }));
      } else {
        setSaleReport((state) => ({
          ...state,
          weekSale: saleByDate(response, "week"),
          monthSale: saleByDate(response, "month"),
        }));
      }
    });
  }, []);

  // socket.on('salesReport', data => {
  //   setSaleReport(state => ({
  //     ...state,
  //     todaySale: data[0].total,
  //     percentage: ((data[0].total * 100) / state.objective).toFixed(2),
  //     weekSale: saleByDate(data, 'week'),
  //     monthSale: saleByDate(data, 'month'),
  //   }));
  // });

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Venta total hoy</h1>
        {/* <MoreVertIcon fontSize="small" /> */}
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={saleReport.percentage}
            text={`${saleReport.percentage}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Ventas de hoy</p>
        <p className="amount">${saleReport.todaySale}</p>
        {/* <p className="desc">
      Previous transactions processing. Last payments may not be included.
    </p> */}
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Meta</div>
            <div className="itemResult positive">
              {/* <KeyboardArrowDownIcon fontSize="small" /> */}
              <div className="resultAmount">${saleReport.objective}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Semana pasada</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${saleReport.weekSale}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Mes pasado</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${saleReport.monthSale}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
