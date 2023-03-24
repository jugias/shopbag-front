import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCheckoutMP = createAsyncThunk(
	"checkout/getCheckoutMP",
	async () => {
		await axios.get("/api/checkout").catch((err) => {
			console.log(err);
		});
	}
);

const initialState = {
	checkout: [],
};

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {},
	extraReducers: {
		[getCheckoutMP.pending]: () => {
			console.log("Checkout Datos MercadoPago Compra");
		},
		[getCheckoutMP.fulfilled]: (state, action) => {
			console.log("Checkout Datos MercadoPago Compra", action.payload);
		},
	},
});

export default checkoutSlice.reducer;
export const checkoutMP = (state) => state.checkout.checkout;
