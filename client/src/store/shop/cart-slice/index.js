import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

const getGuestId = () => {
  let guestId = localStorage.getItem('guestId');
  if (!guestId) {
    guestId = `guest_${Date.now()}`; // Create a unique guest ID
    localStorage.setItem('guestId', guestId);
  }
  return guestId;
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    // If no user is logged in, use guestId
    const guestId = !userId ? getGuestId() : userId;
    const response = await axios.post(
      "https://scn-royal-server.vercel.app/api/shop/cart/add",
      {
        userId: guestId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const guestId = !userId ? getGuestId() : userId;
    const response = await axios.get(
      `https://scn-royal-server.vercel.app/api/shop/cart/get/${guestId}`
    );

    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const guestId = !userId ? getGuestId() : userId;
    const response = await axios.delete(
      `https://scn-royal-server.vercel.app/api/shop/cart/${guestId}/${productId}`
    );

    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const guestId = !userId ? getGuestId() : userId;
    const response = await axios.put(
      "https://scn-royal-server.vercel.app/api/shop/cart/update-cart",
      {
        userId: guestId,
        productId,
        quantity,
      }
    );

    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log('Cart payload:', action.payload);
        state.isLoading = false;
        state.cartItems = action.payload?.data || [];
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
