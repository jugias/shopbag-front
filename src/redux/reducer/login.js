import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiLogin = createAsyncThunk('login/local', async payload => {
  const response = await axios
    .post(`/api/login`, payload)
    .then(response => response.data)
    .catch(({ response }) => ({ ...response.data, error: true }));
  return response;
});

export const apiLoginGoogle = createAsyncThunk(
  'login/google',
  async payload => {
    const response = await axios
      .post(`/api/login/google`, payload)
      .then(response => response.data)
      .catch(({ response }) => ({ ...response.data, error: true }));
    return response;
  }
);

export const apiLoginFacebook = createAsyncThunk(
  'login/facebook',
  async payload => {
    const response = await axios
      .post(`/api/login/facebook`, payload)
      .then(response => response.data)
      .catch(({ response }) => ({ ...response.data, error: true }));
    return response;
  }
);

export const rootVerification = createAsyncThunk('login/root', async () =>
  axios
    .post(
      `/api/user/root`,
      {},
      {
        headers: {
          'auth-token': JSON.parse(localStorage.getItem('userCredentials'))
            .token,
        },
      }
    )
    .then(response => response.data)
);

const initialState = {
  userCredentials: localStorage.getItem('userCredentials')
    ? localStorage.getItem('userCredentials')
    : {},
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    cleanLogin: state => {
      state.userCredentials = {};
    },
    logOut: state => {
      localStorage.removeItem('userCredentials');
      localStorage.removeItem('carrito');
      state.userCredentials = {};
    },
  },
  extraReducers: {
    [apiLogin.pending]: () => {
      return { userCredentials: { loading: true } };
    },
    [apiLogin.fulfilled]: (state, action) => {
      if (!action.payload.error) {
        localStorage.setItem('userCredentials', JSON.stringify(action.payload));
      } else localStorage.removeItem('userCredentials');
      return { userCredentials: action.payload };
    },
    [apiLogin.rejected]: (state, action) => {
      return { userCredentials: action.payload };
    },

    [apiLoginGoogle.pending]: () => {
      return { userCredentials: { loading: true } };
    },
    [apiLoginGoogle.fulfilled]: (state, action) => {
      if (!action.payload.error) {
        localStorage.setItem('userCredentials', JSON.stringify(action.payload));
      } else localStorage.removeItem('userCredentials');
      return { userCredentials: action.payload };
    },
    [apiLoginGoogle.rejected]: (state, action) => {
      return { userCredentials: action.payload };
    },

    [apiLoginFacebook.pending]: () => {
      return { userCredentials: { loading: true } };
    },
    [apiLoginFacebook.fulfilled]: (state, action) => {
      if (!action.payload.error) {
        localStorage.setItem('userCredentials', JSON.stringify(action.payload));
      } else localStorage.removeItem('userCredentials');
      return { userCredentials: action.payload };
    },
    [apiLoginFacebook.rejected]: (state, action) => {
      return { userCredentials: action.payload };
    },
  },
});

export const { cleanLogin, logOut } = loginSlice.actions;

export default loginSlice.reducer;
