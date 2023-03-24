import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("userCredentials"); //No tocar, funciona solo con esta estructura
const parseToken = JSON.parse(token);

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
	const response = await axios
		.get("/api/user/all", {
			headers: {
				"auth-token": parseToken.token,
			},
		})

		.catch((err) => {
			console.log(err);
		});
	return response.data;
});

const initialState = {
	getAllUsers: [],
};

const allUserSlice = createSlice({
	name: "getAllUsers",
	initialState,
	reducers: {},
	extraReducers: {
		[getAllUsers.pending]: () => {
			console.log("Trayendo usuarios");
		},
		[getAllUsers.fulfilled]: (state, action) => {
			return { ...state, getAllUsers: action.payload };
		},
	},
});

export default allUserSlice.reducer;
export const allUserRegisters = (state) => state.userAll.getAllUsers;
