import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";

import { CreateProducts } from "../../../../Components/createProduct/CreateProducts";
import axios from "axios";
import swal from "sweetalert";

export const ProductDetails = () => {
	const navigate = useNavigate();
	//trae todas las ordenes
	let productsAll = useSelector((state) => state.productsAdmin.productsAdmin);
	//filtro por el numero de orden
	const { productId } = useParams();
	console.log(productId);
	const data = productsAll.find((e) => e.id === productId);
	// console.log("filterProduct", filterOrderbyNumberProduct);

	// const [data] = useState(filterOrderbyNumberProduct[0]);
	// console.log(data);

	//return table
	const handleRegresar = () => {
		navigate("/admin/products");
	};
	const handleBanearProduct = async () => {
		try {
			const id = productId;
			await axios.put("/api/activateProduct", { id });
			// console.log("exito banned");
			swal(
				"Exito!",
				`Producto ${
					data.active ? "DesActivado" : "Activado"
				} con exito`,
				"success"
			);
			navigate("/admin/products");
		} catch (error) {
			console.log(error);
			swal("Error!", `Producto no modificado `, "warning");
		}
	};
	const handleClose = () => {
		navigate("/admin/products");
	};
	return (
		<div className="ProductDetail__container">
			<div className="ProductDetail__container-list">
				<div className="orderDetail__header">
					<h1>Detalle del Producto </h1>
				</div>
				<div className="ProductDetail__container-item">
					<h3 className="title__list">ID</h3>
					<div className="list__item">{data.id} </div>
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Nombre</h3>
					<div className="list__item">{data.name} </div>
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Precio</h3>
					<div className="list__item">{data.price} </div>
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Stock</h3>
					<div className="list__item">{data.stock} </div>
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Marca</h3>
					<div className="list__item">{data.brand} </div>
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Categoria</h3>
					<div className="list__item">{data.category} </div>
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Color</h3>
					<div className="list__item">{data.color} </div>
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Descuento</h3>
					<div className="list__item">{data.discount} </div>
				</div>
				<hr className="divider" />

				<div className="ProductDetail__container-item">
					<h3 className="title__list">Garantia</h3>
					<div className="list__item">{data.warranty} </div>
				</div>
				<hr className="divider" />

				<div className="ProductDetail__container-item">
					<h3 className="title__list">Descripción</h3>
					<div className="list__item"> {data.description}</div>
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Activo</h3>
					{data.active ? (
						<div className="list__item"> false</div>
					) : (
						<div className="list__item"> true</div>
					)}
				</div>
				<hr className="divider" />
				<div className="ProductDetail__container-item">
					<h3 className="title__list">Imagen referencial</h3>
					<div className="list__item">
						{" "}
						<img src={data.image[0]} alt="" />
					</div>
				</div>
				<button className="btn btn-color" onClick={handleRegresar}>
					Regresar
				</button>
				<button
					className="btn btn-warning ml-2"
					data-bs-toggle="modal"
					data-bs-target={"#editProductsDetail"}
				>
					Editar
				</button>
				<button
					className={`btn ${
						data.active ? "btn-danger" : "btn-success"
					} btn-success ml-2`}
					onClick={handleBanearProduct}
				>
					{data.active ? "DesActivar" : "Activar"}
				</button>
			</div>
			{/* modal para edit product */}
			<div
				className="modal fade"
				id={"editProductsDetail"}
				tabIndex="-1"
				aria-labelledby={"editProductsDetail"}
				aria-hidden="true"
			>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5
								className="modal-title"
								id={"editProductsDetail"}
							>
								Editar Producto
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={handleClose}
							></button>
						</div>
						<div className="modal-body">
							<CreateProducts
								editDescription={data.description}
								editName={data.name}
								editPrice={data.price}
								editImage={data.image}
								editId={data.id}
								editColor={data.color}
								editBrand={data.brand}
								editStock={data.stock}
								editWarranty={data.warranty}
								editCategory={data.category}
								editGenre={data.genre}
								editDiscount={data.discount}
								isEdit={true}
							/>
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
		</div>
	);
};
