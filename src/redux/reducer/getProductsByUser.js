import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsByUser = createAsyncThunk(
	"productsByUser/getProductsByUser",
	async () => {
		const user = {
			headers: {
				"auth-token": JSON.parse(
					localStorage.getItem("userCredentials")
				).token,
			},
		};
		const response = await axios
			.get("/api/productsByUser", user)
			.catch((err) => {
				console.log(err);
			});
		return response.data;
	}
);

const initialState = {
	productsByUser: [],
};

const productsByUserSlice = createSlice({
	name: "productsByUser",
	initialState,
	reducers: {},
	extraReducers: {
		[getProductsByUser.pending]: () => {
			console.log("Trayendo getProductsByUser");
		},
		[getProductsByUser.fulfilled]: (state, action) => {
			return { ...state, productsByUser: action.payload };
		},
	},
});

export default productsByUserSlice.reducer;
export const productsByUserAll = (state) => state.productsByUser.productsByUser;
