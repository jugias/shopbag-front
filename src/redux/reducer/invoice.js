import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserInvoices = createAsyncThunk(
  'invoice/getUserInvoices',
  async () =>
    await axios
      .get('/api/invoice/user', {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('userCredentials'))
            .token,
        },
      })
      .then(response => response.data)
      .catch(error => error.data)
);

const initialState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInvoices.fulfilled]: (state, { payload }) => ({
      invoices: payload,
    }),
  },
});

export default invoiceSlice.reducer;
