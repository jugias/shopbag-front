import React from "react";
import "./invoice.css";

export const InvoiceModal = ({ invoice }) => {
	return (
		<div
			className="modal fade"
			id="invoiceModal"
			tabIndex="-1"
			aria-labelledby="invoiceModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-xl">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="invoiceModalLabel">
							Factura {invoice.invoiceNumber}
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<div
							className="page-content container"
							style={{ background: "white" }}
						>
							<div className="page-header text-blue-d2">
								<div className="page-tools">
									<div className="action-buttons">
										{/* <a
											className="btn bg-white btn-light mx-1px text-95"
											href="#top"
											data-title="Print"
										>
											<i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
											Imprimir
										</a> */}
										{/* <a
											className="btn bg-white btn-light mx-1px text-95"
											href="#top"
											data-title="PDF"
										>
											<i className="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
											Exportar
										</a> */}
									</div>
								</div>
							</div>

							<div className="col-12 col-lg-12">
								<div className="row">
									<div className="col-12">
										<div className="text-center text-150">
											<i className="fa fa-book fa-2x text-success-m2 mr-1"></i>
											<span className="text-default-d3">
												Orden de Compa Nro.0000
												{invoice.invoiceNumber}
											</span>
										</div>
									</div>
								</div>

								<hr className="row brc-default-l1 mx-n1 mb-4" />

								<div className="row">
									<div className="col-sm-6">
										<div>
											<span className="text-sm text-grey-m2 align-middle">
												De:
											</span>
											<span className="text-600 text-110 text-blue align-middle">
												{invoice.firstName}{" "}
												{invoice.lastName}
											</span>
										</div>
									</div>
								</div>

								<div className=" row text-600 text-white bgc-default-tp1 py-25">
									<div className="d-none d-sm-block col-1">
										#
									</div>
									<div className="d-none d-sm-block col-sm-3">
										Descripción
									</div>
									<div className="d-none d-sm-block col-sm-2">
										Cantidad
									</div>
									<div className="d-none d-sm-block col-sm-2">
										Precio Unitario
									</div>
									<div className="d-none d-sm-block col-sm-2">
										Descuento
									</div>
									<div className="d-none d-sm-block col-sm-2">
										Total
									</div>
								</div>

								<div className="text-95 text-secondary-d3">
									{invoice.orders.map((elem, index) => {
										return (
											<div className="row mb-2 mb-sm-0 py-25">
												<div className="d-none d-sm-block col-1">
													{index + 1}
												</div>
												<div className="col-sm-3">
													{elem.product.name}
												</div>
												<div className="d-none d-sm-block col-2">
													{elem.quantity}
												</div>
												<div className="d-none d-sm-block col-2 ">
													{elem.unitPrice}
												</div>
												<div className="d-none d-sm-block col-2 ">
													{elem.discount ||
														"Sin descuento"}
												</div>

												<div className="col-2 text-secondary-d2">
													{elem.total}
												</div>
											</div>
										);
									})}
								</div>
								<div className="row border-b-2 brc-default-l2"></div>
								<div className="row mt-3">
									<div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
										<div className="row my-2 align-items-center bgc-primary-l3 p-2">
											<div className="col-7 text-right">
												Total Monto
											</div>
											<div className="col-5">
												<span className="text-150 text-success-d3 opacity-2">
													{invoice.total}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-color"
							data-bs-dismiss="modal"
						>
							Cerrar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
