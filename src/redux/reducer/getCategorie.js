import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories = createAsyncThunk(
	"categories/getAllCategories",
	async () => {
		const response = await axios
			.get("/api/categories")
			.catch((err) => {
				console.log(err);
			});
		return response.data;
	}
);

const initialState = {
	categories: [],
};

const categorieSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: {
		[getAllCategories.pending]: () => {
			console.log("Trayendo Categorias");
		},
		[getAllCategories.fulfilled]: (state, action) => {
			return { ...state, categories: action.payload };
		},
	},
});

export default categorieSlice.reducer;
export const categoriesAll = (state) => state.categories.categories;
