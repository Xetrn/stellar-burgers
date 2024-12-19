import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../utils/burger-api';
import { TOrder } from '../utils/types';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  orderBurgerApi
);

export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  getOrderByNumberApi
);

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

export const initialState: TOrdersState = {
  orders: [],
  isLoading: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderLoading: (state) => state.isLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      })
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      })
      // fetchOrderByNumber
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { selectOrders, selectOrderLoading } = ordersSlice.selectors;

export default ordersSlice.reducer;
