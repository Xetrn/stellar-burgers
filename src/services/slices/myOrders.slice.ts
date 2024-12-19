import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchMyOrders = createAsyncThunk(
  'myOrders/fetchMyOrders',
  getOrdersApi
);

type TMyOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | undefined | null;
};

const initialState: TMyOrdersState = {
  orders: [],
  loading: true,
  error: null
};

export const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {},
  selectors: {
    getMyOrders: (state) => state.orders,
    getMyOrdersLoading: (state) => state.loading,
    getMyOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { getMyOrders, getMyOrdersError, getMyOrdersLoading } =
  myOrdersSlice.selectors;
