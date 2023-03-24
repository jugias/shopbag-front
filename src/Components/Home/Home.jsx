// import React, { useEffect, useState } from "react";
// import {
// 	fetchProducts,
// 	getAllProducts,
// 	getByCategories,
// } from "../../redux/reducer/products";
// import {
// 	getAllCategories,
// 	categoriesAll,
// } from "../../redux/reducer/getCategorie";
// import { useDispatch, useSelector } from "react-redux";
// import Header from "../Headers/Header";
// import Card from "../Card/Cards";

// const Home = () => {
// 	const [category, setCategory] = useState("");
// 	const dispatch = useDispatch();
// 	useEffect(() => {
// 		dispatch(fetchProducts());
// 		dispatch(getAllCategories());
// 	}, [dispatch]);
// 	const handleOnChange = (e) => {
// 		dispatch(getByCategories(e.target.value));
// 		if (e.target.value === "All") {
// 			dispatch(fetchProducts());
// 		}
// 		setCategory(e.target.value);
// 	};
// 	let categories = useSelector(categoriesAll);
// 	console.log(categories);
// 	let products = useSelector(getAllProducts);
// 	if (products.length === 0) {
// 		products = "No hay resultados que mostrar";
// 	}
// 	return (
// 		<>
// 			<Header />
// 			<div className="col-12 d-flex mt-3">
// 				<div className="col-6">Algo</div>
// 				<div className="col-6 filtrado justify-content-end">
// 					<div className="col-3">
// 						<select
// 							className="form-select form-select-lg mb-3"
// 							aria-label=".form-select-lg example"
// 							onChange={handleOnChange}
// 						>
// 							<option value={"All"} defaultValue>
// 								Categoria
// 							</option>
// 							{Array.isArray(categories) ? (
// 								categories.map((cat) => {
// 									return (
// 										<option key={cat.id} value={cat.name}>
// 											{" "}
// 											{cat.name}
// 										</option>
// 									);
// 								})
// 							) : (
// 								<div>{categories}</div>
// 							)}
// 						</select>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="col-12 d-flex py-5">
// 				{Array.isArray(products) ? (
// 					products.map((pr) => {
// 						return (
// 							<Card
// 								key={pr.id}
// 								description={pr.description}
// 								name={pr.name}
// 								image={pr.image}
// 								price={pr.price}
// 							/>
// 						);
// 					})
// 				) : (
// 					<div className="text-light text-center">
// 						<h3>{products}</h3>
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	);
// };
// export default Home;
