import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getData = localStorage.getItem("userCredentials");

let parseGetData = JSON.parse(getData);
export const UpdatePerfil = createAsyncThunk(
	"perfil/updatePerfil",
	async (payload) => {
		console.log(payload, parseGetData.token);
		await axios.post("/api/user/update", payload, {
			headers: { "auth-token": parseGetData.token },
		});
	}
);
export const getPerfil = createAsyncThunk(
	"perfil/getPerfil",
	async (payload) => {
		console.log(payload);
		const response = await axios
			.get("/api/user", {
				headers: { "auth-token": payload },
			})
			.catch((err) => console.log(err));
		return response.data;
	}
);

const initialState = {
	perfil: [],
};

const perfilSlice = createSlice({
	name: "perfil",
	initialState,
	reducer: {},
	extraReducers: {
		[getPerfil.pending]: () => {
			console.log("pending");
		},
		[getPerfil.fulfilled]: (state, action) => {
			return { perfil: action.payload };
		},
	},
});

export default perfilSlice.reducer;
export const getAllInfo = (state) => state.perfil.perfil;
