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
  loading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  loading: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderLoading: (state) => state.loading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
      })
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
      })
      // fetchOrderByNumber
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
      });
  }
});

export const { selectOrders, selectOrderLoading } = ordersSlice.selectors;

export default ordersSlice.reducer;
