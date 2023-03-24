import React, { useEffect, useState } from "react";
import Paginado from "../Paginado/Paginado";
import "./Home.css";
import {
	fetchProducts,
	getAllProducts,
	getByCategories,
	sortByName,
	sortByNameInversa,
	sortByPrice,
	sortByPriceInversa,
} from "../../redux/reducer/products";
import {
	getAllCategories,
	categoriesAll,
} from "../../redux/reducer/getCategorie";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Cards";

import Banner from "../Banner/Banner";

const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(getAllCategories());
	}, [dispatch]);
	const handleOnChange = (e) => {
		if (e.target.value === "All") {
			dispatch(fetchProducts());
		} else {
			dispatch(getByCategories(e.target.value));
		}
		setCurrentPage(1);
	};
	let categories = useSelector(categoriesAll);

	let products = useSelector(getAllProducts);

	//*****Para el paginado*****
	const [currentPage, setCurrentPage] = useState(1);
	const [prodsPerPage] = useState(6);
	const indexOfLastProd = currentPage * prodsPerPage;
	const indexOfFirstProd = indexOfLastProd - prodsPerPage;
	const currentProducts = products.slice(indexOfFirstProd, indexOfLastProd);
	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleOnChangeOrder = (e) => {
		if (e.target.value === "sinalterar") {
			dispatch(fetchProducts());
		} else if (e.target.value === "AaZ") {
			dispatch(sortByName());
		} else if (e.target.value === "ZaA") {
			dispatch(sortByNameInversa());
		} else if (e.target.value === "lowPrice") {
			dispatch(sortByPrice());
		} else {
			dispatch(sortByPriceInversa());
		}
		setCurrentPage(1);
	};
	if (products.length === 0) {
		products = "No hay resultados que mostrar";
	}

	return (
		<>
			<Banner />
			<div className="col-12 d-flex mt-4  ">
				<div className="col-xl-6 col-lg-6 col col-md-12 col-sm-12 col-12 filtrado d-flex justify-content-center">
					<div className="col-6">
						<select
							className="form-select form-select-lg mb-1"
							aria-label=".form-select-lg example"
							onChange={handleOnChange}
						>
							<option value={"All"} defaultValue>
								Todos
							</option>
							{Array.isArray(categories) ? (
								categories.map((cat, i) => {
									return (
										<option key={i} value={cat.name}>
											{cat.name}
										</option>
									);
								})
							) : (
								<div>{categories}</div>
							)}
						</select>
					</div>
					<div className="col-6 mr-2">
						<select
							className="form-select form-select-lg mb-1"
							aria-label=".form-select-lg example"
							onChange={handleOnChangeOrder}
						>
							<option value={"sinalterar"} defaultValue>
								Ordenamiento
							</option>
							<option value={"AaZ"}>
								Alfabeticamente de A-Z
							</option>
							<option value={"ZaA"}>Inversamente de Z-A</option>
							<option value={"lowPrice"}>
								Precio: menor a mayor
							</option>
							<option value={"Highrice"}>
								Precio: mayor a menor
							</option>
						</select>
					</div>
				</div>
			</div>
			<div className="justify-content-center  d-flex flex-wrap">
				{/*Acá empiezan los productos */}
				{currentProducts.length !== 0 && (
					<Paginado
						className="paginado"
						prodPerPage={prodsPerPage}
						allProducts={products.length}
						paginado={paginado}
					/>
				)}
				{currentProducts.length ? (
					<div className="wrapper">
						{currentProducts.map((pr) => {
							return (
								<Card
									key={pr.id}
									description={pr.description}
									name={pr.name}
									image={pr.image}
									price={pr.price}
									id={pr.id}
									color={pr.color}
									brand={pr.brand}
									stock={pr.stock}
									warranty={pr.warranty}
									category={pr.category}
									reviews={pr.reviews}
								/>
							);
						})}
					</div>
				) : (
					<div className="text-dark text-center">
						<h3 className="h3-prod">No se encuentran productos</h3>
					</div>
				)}
			</div>
		</>
	);
};
export default Home;
