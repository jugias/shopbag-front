import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInvoices } from "../../redux/reducer/invoice";
import { getPerfil } from "../../redux/reducer/perfil";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./datatable.scss";
import { InvoiceModal } from "./InvoiceModal";

export const UserInvoices = () => {
	const dispatch = useDispatch();
	const invoices = useSelector(({ invoice }) => invoice.invoices);
	const user = useSelector(({ perfil }) => perfil.perfil);

	const [invoiceDetails, setInvoiceDetails] = useState({ orders: [] });
	useEffect(() => {
		dispatch(getUserInvoices());
		dispatch(
			getPerfil(JSON.parse(localStorage.getItem("userCredentials")).token)
		);
	}, []);

	const invoiceColumns = [
		{ field: "invoiceNumber", headerName: "N°" },
		{ field: "total", headerName: "Total" },
		{
			field: "createdAt",
			headerName: "Fecha",
			width: 120,
			renderCell: ({ row }) => row.createdAt.substring(0, 10),
		},
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
			<InvoiceModal invoice={invoiceDetails} user={user} />
			<div className="invoiceContainer">
				<div className="datatable">
					<div className="datatableTitle">Facturas de compra</div>
					<DataGrid
						className="datagrid"
						rows={invoices}
						// columns={userColumns.concat(actionColumn)}
						// onSelectionModelChange= {handleRowSelection}

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
