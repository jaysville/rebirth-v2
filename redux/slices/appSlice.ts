import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MerchProps } from "@/types/components";
import { AppState, UserProps } from "@/types/reduxStates";

const initialState: AppState = {
  user: null,
  token: null,
  isAdmin: false,
  sessionExpiresAt: null,
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
    updateUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    refreshToken: (state, action) => {
      const newToken = action.payload;

      state.token = newToken;
      state.sessionExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    },
    updateAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAdmin = false;
      state.sessionExpiresAt = null;
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
  updateUser,
  addToCart,
  removeFromCart,
  refreshToken,
  logout,
  clearItem,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;
