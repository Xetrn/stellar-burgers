import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  onFulfilledCreateOrder,
  onPendingCreateOrder,
  onRejectedCreateOrder
} from '../reducers/create-order';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  isLoadingCreateOrder: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

const initialState: TNewOrderState = {
  isLoadingCreateOrder: false,
  orderModalData: null,
  error: undefined
};

export const createOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  selectors: {
    getIsLoadingOrder: (state: TNewOrderState) => state.isLoadingCreateOrder,
    getOrder: (state: TNewOrderState) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, onPendingCreateOrder)
      .addCase(createOrder.fulfilled, onFulfilledCreateOrder)
      .addCase(createOrder.rejected, onRejectedCreateOrder);
  }
});

export const { resetOrder } = createOrderSlice.actions;
export const { getIsLoadingOrder, getOrder } = createOrderSlice.selectors;
