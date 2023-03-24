import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllInvoices = createAsyncThunk(
  'Allinvoices/getAllInvoices',
  async () =>
    await axios
      .get('/api/invoice/all', {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('userCredentials'))
            .token,
        },
      })
      .then(response => response.data)
      .catch(error => error.data)
);

const initialState = {
  Allinvoices: [],
};

const AllinvoiceSlice = createSlice({
  name: 'Allinvoices',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllInvoices.fulfilled]: (state, { payload }) => ({
      Allinvoices: payload,
    }),
  },
});

export default AllinvoiceSlice.reducer;
