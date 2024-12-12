import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', getFeedsApi);

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  selectors: {
    selectFeeds: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectFeedLoading: (state) => state.loading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
      });
  }
});

export const { selectFeeds, selectTotal, selectTotalToday, selectFeedLoading } =
  feedsSlice.selectors;

export default feedsSlice.reducer;
