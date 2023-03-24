import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsAdmin = createAsyncThunk(
	"productsAdmin/getProductsAdmin",
	async () => {
		const response = await axios.get("/api/productsAdmin").catch((err) => {
			console.log(err);
		});
		return response.data;
	}
);

const initialState = {
	productsAdmin: [],
};

const productsAdminSlice = createSlice({
	name: "productsAdmin",
	initialState,
	reducers: {},
	extraReducers: {
		[getProductsAdmin.pending]: () => {
			console.log("Trayendo getProductsAdmin");
		},
		[getProductsAdmin.fulfilled]: (state, action) => {
			return { ...state, productsAdmin: action.payload };
		},
	},
});

export default productsAdminSlice.reducer;
