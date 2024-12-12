import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrdersUser = createAsyncThunk('userOrder/orders', getOrdersApi);

export interface TOrdersState {
  orders: TOrder[];
  isLoading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  isLoading: true
};

export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {},
  selectors: {
    orders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrdersUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersUser.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { orders } = userOrderSlice.selectors;
export default userOrderSlice.reducer;
