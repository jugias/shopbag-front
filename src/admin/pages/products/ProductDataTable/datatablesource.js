export const userColumns = [
  { field: "id", headerName: "ID", width: 320 },
  {
    field: "name",
    headerName: "Producto",
    width: 300,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },
  {
    field: "price",
    headerName: "Precio",
    width: 100,
  },

  {
    field: "brand",
    headerName: "Marca",
    width: 100,
  },
  {
    field: "color",
    headerName: "Color",
    width: 100,
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 100,
  },
  {
    field: "category",
    headerName: "Categoria",
    width: 100,
  },
  {
    field: "active",
    headerName: "Activo",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Estado",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];
