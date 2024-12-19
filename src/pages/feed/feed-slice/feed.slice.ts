import { createSlice } from '@reduxjs/toolkit';
import { TFeed } from './types';
import { getFeed, getUserOrders } from './actions';

const initialState: TFeed = {
  orders: [],
  loading: false,
  error: null,
  feed: {
    totalToday: 0,
    total: 0
  },
  userOrders: [],
  loadingUser: false
};

export const FeedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  selectors: {
    selectOrders: (state) => state.orders,
    selectLoading: (state) => state.loading,
    selectLoadingUser: (state) => state.loadingUser,
    selectInfo: (state) => state.feed,
    selectUserOrders: (state) => state.userOrders
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.feed.total = action.payload.total;
      state.feed.totalToday = action.payload.totalToday;
    });
    builder.addCase(getFeed.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getUserOrders.pending, (state) => {
      state.loadingUser = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.userOrders = action.payload;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.loadingUser = false;
      state.error = action.error.message;
    });
  }
});

export const {
  selectUserOrders,
  selectOrders,
  selectLoading,
  selectInfo,
  selectLoadingUser
} = FeedSlice.selectors;

export default FeedSlice.reducer;
