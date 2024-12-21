import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const getUserOrders = createAsyncThunk(
  'orders/userOrders',
  getOrdersApi
);

export interface TUserOrdersState {
  orders: Array<TOrder>;
  isLoading: boolean;
}

export const initialState: TUserOrdersState = {
  orders: [],
  isLoading: false
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectOrderList: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { selectOrderList } = userOrdersSlice.selectors;
