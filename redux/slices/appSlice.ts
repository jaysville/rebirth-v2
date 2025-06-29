import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MerchProps } from "@/types/components";
import { AppState } from "@/types/reduxStates";

const initialState: AppState = {
  isAdmin: false,
  token: "",
  merch: [],
  cart: [],
  cartItemIds: [],
  totalQuantity: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMerch: (state, action: PayloadAction<MerchProps[]>) => {
      state.merch = action.payload;
    },
    updateAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    addToCart: (
      state,
      action: PayloadAction<{
        merch: MerchProps;
        quantity: number;
        size: string;
      }>
    ) => {
      const { merch, quantity, size } = action.payload;
      const existingCartItem = state.cart.find(
        (item) => item._id === merch._id && item.size === size
      );

      state.totalQuantity += quantity;

      if (!existingCartItem) {
        state.cart.push({ ...merch, quantity, size });
        state.cartItemIds.push(merch._id);
      } else {
        existingCartItem.quantity += quantity;
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; size: string }>
    ) => {
      const { id, size } = action.payload;
      const existingCartItem = state.cart.find(
        (item) => item._id === id && item.size === size
      );

      if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
          state.cart = state.cart.filter(
            (item) => !(item._id === id && item.size === size)
          );
          state.cartItemIds = state.cartItemIds.filter(
            (itemId) => itemId !== id
          );
        } else {
          existingCartItem.quantity--;
        }
        state.totalQuantity--;
      }
    },
    clearItem: (state, action: PayloadAction<{ id: string; size: string }>) => {
      const { id, size } = action.payload;
      const item = state.cart.find(
        (item) => item._id === id && item.size === size
      );

      if (item) {
        state.totalQuantity -= item.quantity;
        state.cart = state.cart.filter(
          (item) => !(item._id === id && item.size === size)
        );
        state.cartItemIds = state.cartItemIds.filter((itemId) => itemId !== id);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.cartItemIds = [];
    },
  },
});

export const {
  setMerch,
  updateAdmin,
  addToCart,
  removeFromCart,
  clearItem,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;
