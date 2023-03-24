import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSales } from '../../redux/reducer/sale';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './datatable.scss';
export const UserSales = () => {
  const dispatch = useDispatch();
  const sales = useSelector(({ sale }) => sale.sales);

  useEffect(() => {
    dispatch(getUserSales());
  }, []);

  const saleColumns = [
    {
      field: 'orderNumber',
      headerName: 'N°',
      width: 40,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'product',
      headerName: 'Nombre',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => row.product.name,
    },
    {
      field: 'unitPrice',
      headerName: 'Precio U.',
      renderCell: ({ row }) => '$' + row.unitPrice,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'quantity',
      headerName: 'Cantidad',
      renderCell: ({ row }) => '$' + row.quantity,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'discount',
      headerName: 'Descuento',
      renderCell: ({ row }) =>
        row.discount ? '%' + row.discount : 'sin descuento',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total',
      headerName: 'Total',
      renderCell: ({ row }) => '$' + row.total,
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'status',
      headerName: 'estado',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { status } }) => {
        const colors = {
          success: 'Recibido',
          warning: 'en camino',
          info: 'Recepción',
        };
        return (
          <div
            className={
              'alert alert-' +
              Object.keys(colors).find(color => colors[color] === status)
            }
            role='alert'
          >
            {status}
          </div>
        );
      },
    },
    {
      field: 'orderDate',
      headerName: 'Fecha',
      headerAlign: 'center',
      align: 'center',
    },
  ];

  return (
    <div className='saleContainer'>
      <div className='datatable'>
        <div className='datatableTitle'>Ventas</div>
        <DataGrid
          className='datagrid'
          rows={sales}
          // columns={userColumns.concat(actionColumn)}
          // onSelectionModelChange= {handleRowSelection}

          columns={saleColumns}
          pageSize={13}
          rowsPerPageOptions={[15]}
          // checkboxSelection
          autoPageSize
          autoHeight
          localeText={{
            toolbarColumns: 'Columnas',
            toolbarFilters: 'Filtros',
            toolbarDensity: 'Densidad',
            toolbarExport: 'Exportar',
            columnMenuUnsort: 'No clasificado',
            columnMenuSortAsc: 'Ascendente ',
            columnMenuSortDesc: 'Descendente',
            columnMenuFilter: 'Filtro',
            columnMenuHideColumn: 'Ocultar',
            columnMenuShowColumns: 'Mostrar columnas',
          }}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
};
