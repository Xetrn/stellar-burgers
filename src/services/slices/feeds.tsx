import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';
import {
  onFulfilledGetAllFeeds,
  onPendingGetAllFeeds,
  onRejectedGetAllFeeds
} from '../reducers/feeds';

export const getAllFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

export interface TFeedsState {
  isLoadingGetFeeds: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  error: string | undefined;
}

export const initialState: TFeedsState = {
  isLoadingGetFeeds: true,
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeed: (state) => state.orders,
    getTotalFeeds: (state) => state.total,
    getTotalTodayFeeds: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, onPendingGetAllFeeds)
      .addCase(getAllFeeds.fulfilled, onFulfilledGetAllFeeds)
      .addCase(getAllFeeds.rejected, onRejectedGetAllFeeds);
  }
});

export const { getOrdersFeed, getTotalFeeds, getTotalTodayFeeds } =
  feedsSlice.selectors;
