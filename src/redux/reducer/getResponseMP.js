import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const userToken = JSON.parse(localStorage.getItem('userCredentials')).token

export const getPaymentIdMP = createAsyncThunk(
  'getResponseMp/getPaymentIdMP',
  async payload => {
    const response = await axios
      .get(`/api/paymentIdPM?payment_id=${payload}`)
      .catch(err => {
        console.log(err);
      });
    return response.data;
  }
);

export const getOrderMP = createAsyncThunk(
  'getResponseMp/getOrderMP',
  async payload => {
    const userToken = JSON.parse(localStorage.getItem('userCredentials')).token;
    const response = await axios
      .get(`/api/orders/checkout`, { headers: { 'auth-token': userToken } })
      .catch(err => {
        console.log(err);
      });
    return response.data;
  }
);

export const postOrderMP = createAsyncThunk(
  'getResponseMp/postOrderMP',
  async () => {
    const userToken = JSON.parse(localStorage.getItem('userCredentials')).token;
    const response = await axios
      .post(`/api/invoice`, {}, { headers: { 'auth-token': userToken } })
      .catch(err => {
        console.log(err);
      });
    return response.data;
  }
);

const initialState = {
  listOrders: {},
  invoice: {},
};

const paymentIdSlice = createSlice({
  name: 'getResponseMp',
  initialState,
  reducers: {},
  extraReducers: {
    [getOrderMP.fulfilled]: (state, action) => {
      //console.log("Trayendo Datos MercadoPago Compra", action.payload)
      return { ...state, listOrders: action.payload };
    },

    [getPaymentIdMP.fulfilled]: (state, action) => {
      //console.log("Trayendo Datos MercadoPago Compra", action.payload)
      return { ...state, paymentId: action.payload };
    },
    [postOrderMP.fulfilled]: (state, action) => {
      console.log('Trayendo Nro Orden MercadoPago Compra', action.payload);
      return { ...state, invoice: { ...action.payload.invoice }, reviews: action.payload.reviews };
    },
  },
});

export default paymentIdSlice.reducer;
