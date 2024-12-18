import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  onFulfilledGetUserOrdersRequest,
  onPendingGetUserOrdersRequest,
  onRejectedGetUserOrdersRequest
} from '../reducers/user-orders';

export const getUserOrdersRequest = createAsyncThunk(
  'orders/ofUser',
  getOrdersApi
);

export interface TOrdersState {
  orders: Array<TOrder>;
  isLoadingUserOrders: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  isLoadingUserOrders: true
};

export const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state) => state.orders,
    isLoadingGetUserOrders: (state) => state.isLoadingUserOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersRequest.pending, onPendingGetUserOrdersRequest)
      .addCase(getUserOrdersRequest.fulfilled, onFulfilledGetUserOrdersRequest)
      .addCase(getUserOrdersRequest.rejected, onRejectedGetUserOrdersRequest);
  }
});

export const { getUserOrders, isLoadingGetUserOrders } =
  userOrdersSlice.selectors;
