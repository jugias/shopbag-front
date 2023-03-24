import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendEmail = createAsyncThunk(
  "forgotPassword/sendEmail",
  async (payload) => {
    const response = await axios.post("/api/sendEmail", payload);
    localStorage.setItem("emailForRecovery", JSON.stringify(response.data));
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  "forgotPassword/changePassword",
  async (payload) => {
    const response = await axios.post("api/forgotPassword", payload);
  }
);

const initialState = {
  forgotPassword: [],
};

const sendEmailSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducer: {},
  extraReducers: {
    [sendEmail.pending]: () => {
      console.log("pending");
    },
    [sendEmail.fulfilled]: (state, action) => {
      console.log("Email Enviado");
    },
    [changePassword.pending]: () => {
      console.log("pending");
    },
    [changePassword.fulfilled]: (state, action) => {
      console.log("cambiado wey");
    },
  },
});

export default sendEmailSlice.reducer;
export const myData = (state) => state.forgotPassword.forgotPassword;
