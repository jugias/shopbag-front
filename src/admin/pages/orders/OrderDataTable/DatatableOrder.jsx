import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { userColumns } from "./datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { allOrdersRegisters } from "../../../../redux/reducer/getAllOrders";
import { getAllOrders } from "../../../../redux/reducer/getAllOrders";

const DatatableOrder = () => {
	const dispatch = useDispatch();
	let data = useSelector(allOrdersRegisters);

	useEffect(() => {
		dispatch(getAllOrders());
		// dispatch(getAllUsers())
	}, [dispatch]);

	// ***********************************

	const [select, setSelection] = useState(0);

	const handleRowSelection = (ids) => {
		const selectedIDs = new Set(ids);
		const selectedRowData = data.filter((row) =>
			selectedIDs.has(row.id.toString())
		);
		const validator = selectedRowData[0]
			? selectedRowData[0].orderNumber
			: 0;
		setSelection(validator);
	};

	return (
		<div className="datatable">
			<div className="datatableTitle">
				Ordenes
				{select !== 0 ? (
					<Link to={select.toString()} className="link">
						Ver
					</Link>
				) : null}
			</div>
			<DataGrid
				className="datagrid"
				rows={data}
				columns={userColumns}
				pageSize={13}
				rowsPerPageOptions={[15]}
				checkboxSelection
				autoPageSize
				autoHeight
				onSelectionModelChange={handleRowSelection}
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
	);
};

export default DatatableOrder;
