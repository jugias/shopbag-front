import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserSales = createAsyncThunk(
  'sales/getUserSales',
  async () =>
    await axios
      .get('/api/sales/user', {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('userCredentials'))
            .token,
        },
      })
      .then(response => response.data)
      .catch(error => error.data)
);

const initialState = {
  sales: [],
};

const saleSlice = createSlice({
  name: 'sale',
  initialState,
  extraReducers: {
    [getUserSales.fulfilled]: (state, { payload: sales }) => ({ sales }),
  },
});

export default saleSlice.reducer;
