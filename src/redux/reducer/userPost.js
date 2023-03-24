import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userRegister = createAsyncThunk(
  'user/userRegister',
  async payload => {
    const response = await axios
      .post('/api/user', payload)
      .then(response => response.data)
      .catch(({ response }) => ({ ...response.data, error: true }));

    return response;
  }
);

const initialState = {
  userResponse: {},
};

export const userSlice = createSlice({
  name: 'userPost',
  initialState,
  reducers: {
    cleanUserResponse: state => {
      state.userResponse = {};
    },
  },
  extraReducers: {
    [userRegister.pending]: () => {
      return {
        userResponse: {
          loading: true,
        },
      };
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        return {
          userResponse: {
            errors: payload.errors.reduce((array, error) => {
              if (!array.some(item => item.param === error.param))
                array.push(error);

              return array;
            }, []),
            error: true,
          },
        };
      }

      return { userResponse: payload };
    },
  },
});

export const { cleanUserResponse } = userSlice.actions;

export default userSlice.reducer;
