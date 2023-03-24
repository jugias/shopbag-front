import { createSlice, createAction } from "@reduxjs/toolkit";

export const addCarrito = createAction("addCarrito");
const initialState = {
  carrito: [],
};

const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    addPush: (state, action) =>
      action.payload.title !== ""
        ? void state.carrito.push(action.payload)
        : void null,
    emptycarrito: (state) => (state = initialState),
    eraseAProduct: (state, action) => {
      let newState = state.carrito.filter((pr) => pr.title !== action.payload);
      state.carrito = newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCarrito, (state, action) => {
      return state.carrito.push(action.payload);
    });
  },
});

export const { addPush, emptycarrito, eraseAProduct } = carritoSlice.actions;
export default carritoSlice.reducer;
export const myKart = (state) => state.carrito.carrito;
