import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { userColumns } from "./datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getProductsAdmin } from "../../../../redux/reducer/getProductsAdmin";

const Datatable = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProductsAdmin());
	}, [dispatch]);
	let data = useSelector((state) => state.productsAdmin.productsAdmin);
	const formatedData = data.map((e) => {
		return {
			id: e.id,
			name: e.name,
			price: e.price,
			brand: e.brand,
			color: e.color,
			stock: e.stock,
			category: e.category,
			active: e.active ? "activo" : "inactivo",
		};
	});
	console.log(formatedData);

	const [select, setSelection] = useState(null);

	const handleRowSelection = (ids) => {
		const selectedIDs = new Set(ids);
		const selectedRowData = data.filter((row) =>
			selectedIDs.has(row.id.toString())
		);
		console.log(selectedRowData);
		const validator = selectedRowData[0] ? selectedRowData[0].id : null;
		setSelection(validator);
	};
	return (
		<div className="datatable">
			<div className="datatableTitle">
				Productos
				<div>
					{select !== null ? (
						<Link to={select} className="link">
							Ver
						</Link>
					) : null}
					<Link to="new" className="link">
						Agregar producto
					</Link>
				</div>
			</div>
			<DataGrid
				className="datagrid"
				rows={formatedData}
				// columns={userColumns.concat(actionColumn)}
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

export default Datatable;
