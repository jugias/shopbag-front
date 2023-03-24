import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async () => {
		const response = await axios.get("/api/products").catch((err) => {
			console.log(err);
		});

		return response.data; //cambiar acá al final
	}
);
export const getByCategories = createAsyncThunk(
	"products/getByCategories",
	async (payload) => {
		const response = await axios
			.get(`/api/filterCategory?name=${payload}`)
			.catch((err) => {
				console.log(err);
			});
		return response.data;
	}
);
export const getByName = createAsyncThunk(
	"search/getByName",
	async (payload) => {
		const response = await axios
			.get(`/api/products?name=${payload}`)
			.catch((err) => {
				console.log(err);
			});
		return response.data;
	}
);

const initialState = {
	products: [],
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		sortByName: (state) => {
			state.products = state.products.sort((a, b) =>
				a.name.localeCompare(b.name)
			);
		},
		sortByNameInversa: (state) => {
			state.products = state.products.sort((a, b) =>
				b.name.localeCompare(a.name)
			);
		},
		sortByPrice: (state) => {
			state.products = state.products.sort((a, b) => a.price - b.price);
		},
		sortByPriceInversa: (state) => {
			state.products = state.products.sort((a, b) => b.price - a.price);
		},
	},
	extraReducers: {
		[fetchProducts.pending]: () => {
			console.log("trayendo products Active");
		},
		[fetchProducts.fulfilled]: (state, action) => {
			return { ...state, products: action.payload };
		},
		[getByName.pending]: () => {
			console.log("Pendinente");
		},
		[getByName.fulfilled]: (state, action) => {
			return { ...state, products: action.payload };
		},
		[getByCategories.pending]: () => {
			console.log("Trayendo por categoria");
		},
		[getByCategories.fulfilled]: (state, action) => {
			return { ...state, products: action.payload };
		},
	},
});

export const {
	sortByName,
	sortByNameInversa,
	sortByPrice,
	sortByPriceInversa,
} = productsSlice.actions;

export default productsSlice.reducer;

export const getAllProducts = (state) => state.products.products;
