import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const getData = localStorage.getItem("userCredentials");

// let parseGetData = JSON.parse(getData);
export const putUserBan = createAsyncThunk(
  "Ban/putUserBan",
  async (payload) => {
    // console.log(parseGetData.token);
    console.log(payload);
    const response = await axios
      .post(`/api/user/ban`, payload, {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('userCredentials'))
          .token,
        },
      })
      .catch(function (error) {
        return error.response;
      });
    return response.data;
  }
);

const initialState = {
  Ban: false,
};

const userBanSlice = createSlice({
  name: "Ban",
  initialState,
  reducers: {},
  extraReducers: {
    [putUserBan.pending]: () => console.log("Seteando el BAN"),
    [putUserBan.fulfilled]: (state, action) => {
      return { ...state, Ban: action.payload };
    },
  },
});

export default userBanSlice.reducer;

export const results = (state) => state.Ban.Ban;
