import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createNewOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => await orderBurgerApi(data)
);
export const fetchOrder = createAsyncThunk(
  'order/fetch',
  async (number: number) => await getOrderByNumberApi(number)
);

type TNewOrderState = {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | undefined | null;
};

const initialState: TNewOrderState = {
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const newOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  selectors: {
    getOrderModalData: (state) => state.orderModalData,
    getOrderRequest: (state) => state.orderRequest,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  }
});

export const { getOrderModalData, getOrderRequest, getOrderError } =
  newOrderSlice.selectors;

export const { resetOrder } = newOrderSlice.actions;
