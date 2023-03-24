import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./datatable.scss";
import { InvoiceModal } from "./InvoiceModal";
import { getAllInvoices } from "../../../../redux/reducer/AllInvoices";

export const ListFacturas = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.Allinvoices.Allinvoices);
  const detailInvoices = invoices.map((e) => {
    return {
      createdAt: e.createdAt,
      id: e.id,
      invoiceNumber: e.invoiceNumber,
      numOfOrders: e.orders.length,
      orders: e.orders,
      user: e.user.userName,
      total: e.total,
      firstName: e.user.firstName,
      lastName: e.user.lastName,
    };
  });

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  const [invoiceDetails, setInvoiceDetails] = useState({ orders: [] });

  const invoiceColumns = [
    { field: "invoiceNumber", headerName: "N°factura" },
    { field: "total", headerName: "Total" },
    {
      field: "createdAt",
      headerName: "Fecha",
      width: 120,
      renderCell: ({ row }) => row.createdAt.substring(0, 10),
    },
    { field: "user", headerName: "Cliente" },
    { field: "numOfOrders", headerName: "Cantidad de ordenes" },
    {
      field: "id",
      headerName: "Acciones",
      width: 140,
      renderCell: ({ row }) => {
        return (
          <button
            data-bs-toggle="modal"
            data-bs-target="#invoiceModal"
            onClick={() => OpenModaldetalles(row)}
            className="btn btn-color"
          >
            Ver detalles
          </button>
        );
      },
    },
  ];

  const OpenModaldetalles = (invoice) => {
    setInvoiceDetails(invoice);
  };

  return (
    <>
      <InvoiceModal invoice={invoiceDetails} />
      <div className="invoiceContainer-Admin">
        <div className="datatable">
          <div className="datatableTitle">Facturas de compra</div>
          <DataGrid
            className="datagrid"
            rows={detailInvoices}
            columns={invoiceColumns}
            pageSize={13}
            rowsPerPageOptions={[15]}
            // checkboxSelection
            autoPageSize
            autoHeight
            localeText={{
              toolbarColumns: "Columnas",
              toolbarFilters: "Filtros",
              toolbarDensity: "Densidad",
              toolbarExport: "Exportar",
              columnMenuUnsort: "No clasificado",
              columnMenuSortAsc: "Ascendente ",
              columnMenuSortDesc: "Descendente",
              columnMenuFilter: "Filtro",
              columnMenuHideColumn: "Ocultar",
              columnMenuShowColumns: "Mostrar columnas",
            }}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </div>
    </>
  );
};
