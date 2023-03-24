export const userColumns = [
  { field: "orderNumber", headerName: "Numero de orden", width: 70 },
  {
    field: "orderDate",
    headerName: "Fecha",
    width: 150,
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
    field: "status",
    headerName: "Estado",
    width: 150,
  },

  {
    field: "purchased",
    headerName: "Facturado",
    width: 100,
  },
  {
    field: "total",
    headerName: "Monto Total",
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

//temporary data
