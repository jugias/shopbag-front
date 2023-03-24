import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const getShoppingCart = createAsyncThunk(
  'shoppingCart/get',
  async () => {
    const token = JSON.parse(localStorage.getItem('userCredentials')).token;
    const response = await axios
      .get(`/api/shoppingCart`, {
        headers: { 'auth-token': token },
      })
      .then(response => response.data);
    return response;
  }
);

export const getShoppingCartGuest = createAsyncThunk(
  'shoppingCart/get/guest',
  async payload => {
    const response = await axios
      .post(`/api/shoppingCart/guest`, payload)
      .then(response => response.data);
    return response;
  }
);

export const postShoppingCart = createAsyncThunk(
  'shoppingCart/post',
  async productId => {
    const token = JSON.parse(localStorage.getItem('userCredentials')).token;
    const response = await axios
      .post(
        `/api/shoppingCart`,
        { productId },
        {
          headers: { 'auth-token': token },
        }
      )
      .then(response => response.data)
      .catch(({ response }) => ({ ...response.data, error: true }));

    return response;
  }
);

export const putShoppingCart = createAsyncThunk(
  'shoppingCart/put',
  async payload => {
    const token = JSON.parse(localStorage.getItem('userCredentials')).token;

    const response = await axios
      .put(`/api/shoppingCart`, payload, {
        headers: { 'auth-token': token },
      })
      .then(response => response.data)
      .catch(({ response }) => ({ ...response.data, error: true }));
    return response;
  }
);

export const deleteShoppingCart = createAsyncThunk(
  'shoppingCart/delete',
  async id => {
    const token = JSON.parse(localStorage.getItem('userCredentials')).token;

    const response = await axios
      .delete(`/api/shoppingCart`, {
        headers: { 'auth-token': token },
        data: { id },
      })
      .then(response => response.data)
      .catch(({ response }) => ({ ...response.data, error: true }));
    return response;
  }
);

export const cleanShoppingCart = createAsyncThunk(
  'shoppingCart/clean',
  async id => {
    const token = JSON.parse(localStorage.getItem('userCredentials')).token;

    const response = await axios
      .delete(`/api/shoppingCart/clean`, {
        headers: { 'auth-token': token },
      })
      .then(response => response.data)
      .catch(({ response }) => ({ ...response.data, error: true }));
    return response;
  }
);

export const addGuestShoppingCart = createAsyncThunk(
  'shoppingCart/addGuest',
  async payload => {
    const token = JSON.parse(localStorage.getItem('userCredentials')).token;
    const response = await axios
      .post(`/api/shoppingCart/addGuest`, payload, {
        headers: { 'auth-token': token },
      })
      .then(response => response.data)
      .catch(({ response }) => ({ ...response.data, error: true }));

    return response;
  }
);

const initialState = {
  shoppingList: localStorage.getItem('shoppingCart')
    ? JSON.parse(localStorage.getItem('shoppingCart'))
    : [],
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addShoppingList: ({ shoppingList }, { payload: { id, stock } }) => {
      const product = shoppingList.find(item => item.productId === id);
      product
        ? product.quantity + 1  <= stock && ++product.quantity
        : shoppingList.push({ productId: id, quantity: 1 });

      localStorage.setItem('shoppingCart', JSON.stringify(shoppingList));
    },

    deleteShoppingList: (state, { payload }) => {
      state.shoppingList = [...state.shoppingList].filter(
        item => item.id !== payload
      );
    },

    updateShoppingList: ({ shoppingList }, { payload: { quantity, id } }) => {
      const product = shoppingList.find(item => item.id === id);

      product.quantity = quantity;

      localStorage.setItem('shoppingCart', JSON.stringify(shoppingList));
    },

    cleanShoppingList: state => {
      localStorage.removeItem('shoppingCart');
      state.shoppingList = [];
    },
  },
  extraReducers: {
    [getShoppingCart.fulfilled]: (state, action) => {
      localStorage.setItem('shoppingCart', JSON.stringify(action.payload));
      return { shoppingList: action.payload };
    },

    [getShoppingCart.rejected]: (state, action) => {
      localStorage.removeItem('shoppingCart');
      return { shoppingList: [] };
    },

    [getShoppingCartGuest.fulfilled]: (state, { payload }) => {
      return { shoppingList: payload };
    },

    [addGuestShoppingCart.fulfilled]: (state, { payload }) => {},
  },
});

export const {
  addShoppingList,
  deleteShoppingList,
  updateShoppingList,
  cleanShoppingList,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
