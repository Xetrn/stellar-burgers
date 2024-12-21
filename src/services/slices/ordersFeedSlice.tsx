import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('orders/getFeeds', getFeedsApi);

export interface TFeedsState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
}

export const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: true,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotalOrders: (state) => state.total,
    selectTotalOrdersToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
  }
});

export const { selectFeedOrders, selectTotalOrders, selectTotalOrdersToday } =
  feedsSlice.selectors;
