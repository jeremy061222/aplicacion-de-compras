import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.cart.find(i => i.id === id);

      if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
          state.cart = state.cart.filter(i => i.id !== id);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
