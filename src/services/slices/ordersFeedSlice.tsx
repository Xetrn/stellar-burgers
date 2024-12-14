import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('orders/getFeeds', getFeedsApi);

export interface TFeedsState {
  feedOrders: Array<TOrder>;
  totalOrders: number;
  totalOrdersToday: number;
  isLoading: boolean;
  errorMessage: string | null | undefined;
}

const initialFeedState: TFeedsState = {
  feedOrders: [],
  totalOrders: 0,
  totalOrdersToday: 0,
  isLoading: true,
  errorMessage: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialFeedState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state) => state.feedOrders,
    selectTotalOrders: (state) => state.totalOrders,
    selectTotalOrdersToday: (state) => state.totalOrdersToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feedOrders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.totalOrdersToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.feedOrders = [];
        state.totalOrders = 0;
        state.totalOrdersToday = 0;
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      });
  }
});

export const { selectFeedOrders, selectTotalOrders, selectTotalOrdersToday } =
  feedsSlice.selectors;
