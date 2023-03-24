import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("userCredentials");
const parseToken = JSON.parse(token);

export const deleteAll = createAsyncThunk("wish/deleteAll", async () => {
	await axios.delete("/api/wishlist/clean", {
		headers: { "auth-token": parseToken.token },
	});
});
export const deleteWish = createAsyncThunk(
	"wish/deleteWish",
	async (payload) => {
		const response = await axios.delete("/api/wishlist", {
			headers: { "auth-token": parseToken.token },
			data: { id: payload },
		});

		console.log(response.data);
		return response.data;
	}
);
export const getList = createAsyncThunk("wish/getList", async (token) => {
	console.log(token);
	const response = await axios.get(
		"/api/wishlist",

		{
			headers: { "auth-token": parseToken.token },
		}
	);
	return response.data;
});

export const postWish = createAsyncThunk("wish/postwish", async (payload) => {
	const response = await axios.post(
		"/api/wishlist",
		{ productId: payload },
		{
			headers: { "auth-token": parseToken.token },
		}
	);
	return response.data;
});

const initialState = {
	wish: [],
};

const wishSlice = createSlice({
	name: "wish",
	initialState,
	reducers: {
		deleteWh: (state, action) => {
			console.log(action.payload);
			let erase = state.wish.filter((wh) => wh.id !== action.payload);
			console.log(erase);
			state.wish = erase;
		},
		deleteAllState: (state) => {
			state.wish = initialState;
		},
	},
	extraReducers: {
		[getList.pending]: () => {
			console.log("Trayendo wishes");
		},
		[getList.fulfilled]: (state, action) => {
			return { ...state, wish: action.payload };
		},
		[postWish.pending]: () => {
			console.log("Enviando datos");
		},
		[postWish.fulfilled]: (payload, state) => {
			return { ...state, wish: payload };
		},
		[deleteWish.pending]: () => {
			console.log("verificando datos");
		},
		[deleteWish.fulfilled]: (state, payload) => {
			console.log("Deletado");
		},
		[deleteAll.fulfilled]: (state, payload) => {
			console.log("todo deleteado");
		},
	},
});
export default wishSlice.reducer;
export const { deleteWh, deleteAllState } = wishSlice.actions;
export const allWishes = (state) => state.wish.wish;
