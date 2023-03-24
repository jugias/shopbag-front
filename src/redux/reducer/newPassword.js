import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getData = localStorage.getItem("userCredentials");

let parseGetData = JSON.parse(getData);
export const getResults = createAsyncThunk(
  "newPass/getResults",
  async (payload) => {
    console.log(parseGetData.token);
    const response = await axios
      .post(`/api/user/newPassword`, payload, {
        headers: {
          "auth-token": parseGetData.token,
        },
      })
      .catch(function (error) {
        return error.response;
      });
    return response.data;
  }
);

const initialState = {
  newPass: [],
};

const newPassSlice = createSlice({
  name: "newPass",
  initialState,
  reducers: {},
  extraReducers: {
    [getResults.pending]: () => console.log("Comprobando"),
    [getResults.fulfilled]: (state, action) => {
      return { ...state, newPass: action.payload };
    },
  },
});

export default newPassSlice.reducer;

export const results = (state) => state.newPass.newPass;
