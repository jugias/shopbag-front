import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllGenres = createAsyncThunk(
	"genres/getAllGenres",
	async () => {
		const response = await axios.get("/api/genres").catch((err) => {
			console.log(err);
		});
		return response.data;
	}
);

const initialState = {
	genres: [],
};

const genresSlice = createSlice({
	name: "genres",
	initialState,
	reducers: {},
	extraReducers: {
		[getAllGenres.pending]: () => {
			console.log("Trayendo genres");
		},
		[getAllGenres.fulfilled]: (state, action) => {
			return { ...state, genres: action.payload };
		},
	},
});

export default genresSlice.reducer;
export const genresAll = (state) => state.genres.genres;
