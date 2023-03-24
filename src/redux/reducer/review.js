import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserReviews = createAsyncThunk(
  'review/getUserReviews',
  async () =>
    await axios
      .get('/api/reviews/user', {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('userCredentials'))
            .token,
        },
      })
      .then(response => response.data)
      .catch(error => error.data)
);

export const postUserReview = createAsyncThunk(
  'review/postUserReview',
  async payload =>
    await axios
      .post('/api/reviews', payload, {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('userCredentials'))
            .token,
        },
      })
      .then(response => response.data)
      .catch(error => error.data)
);

const initialState = {
  userReviews: [],
};

const saleSlice = createSlice({
  name: 'review',
  initialState,
  extraReducers: {
    [getUserReviews.fulfilled]: (state, { payload: userReviews }) => ({
      userReviews,
    }),
  },
});

export default saleSlice.reducer;
