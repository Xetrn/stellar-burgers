import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  isRequestInProgress: boolean;
  orderDetails: TOrder | null;
  orderErrorMessage: string | undefined;
}

const initialOrderState: TNewOrderState = {
  isRequestInProgress: false,
  orderDetails: null,
  orderErrorMessage: undefined
};

export const createOrderSlice = createSlice({
  name: 'newOrder',
  initialState: initialOrderState,
  reducers: {
    resetOrderState: (state) => (state = initialOrderState)
  },
  selectors: {
    selectOrderDetails: (state) => state.orderDetails,
    selectOrderRequestStatus: (state) => state.isRequestInProgress
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isRequestInProgress = false;
        state.orderDetails = action.payload.order;
      })
      .addCase(createOrder.pending, (state) => {
        state.isRequestInProgress = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderErrorMessage = action.error.message;
      });
  }
});

export const { resetOrderState } = createOrderSlice.actions;
export const { selectOrderDetails, selectOrderRequestStatus } =
  createOrderSlice.selectors;
