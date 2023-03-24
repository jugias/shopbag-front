import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { sendNotification } from "../../../utils/notifications";

const List = ({ socket }) => {
  const [rows, setRows] = useState([]);

  const filterRows = (orders) => {
    setRows(
      [...orders].map((order) => ({
        id: order.orderNumber,
        product: order.product.name,
        img: order.product.image[0],
        customer: order.user.firstName + " " + order.user.lastName,
        date: order.orderDate,
        amount: "$" + order.total,
        status: order.status,
      }))
    );
  };

  useEffect(() => {
    sendNotification("lastOrders").then(({ data }) =>
      filterRows(data.response)
    );
  }, []);

  // socket.on('lastOrders', orders => {
  //   filterRows(orders);
  // });

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Producto</TableCell>
            <TableCell className="tableCell">Usuario</TableCell>
            <TableCell className="tableCell">Fecha</TableCell>
            <TableCell className="tableCell">Monto</TableCell>
            {/* <TableCell className="tableCell">Pago </TableCell> */}
            {/* <TableCell className="tableCell">Estado</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              {/* <TableCell className="tableCell">{row.method}</TableCell> */}
              {/* <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
