import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk("orderAll/getAllOrders", async () => {
  const response = await axios
    .get("/api/orders/all", {
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("userCredentials")).token,
      },
    })

    .catch((err) => {
      console.log(err);
    });
  return response.data;
});

const initialState = {
  orderAll: [],
};

const allOrderSlice = createSlice({
  name: "orderAll",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    // [getAllUsers.pending]: () => {
    //   console.log("Trayendo usuarios");
    // },
    [getAllOrders.fulfilled]: (state, action) => {
      return { ...state, orderAll: action.payload };
    },
    
  },
});

export default allOrderSlice.reducer;
export const allOrdersRegisters = (state) => state.orderAll.orderAll;
