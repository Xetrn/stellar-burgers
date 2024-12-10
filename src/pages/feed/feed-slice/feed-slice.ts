import { createReducer, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../../../components/burger-ingredients/ingredients-slice/getIngredients';
import { getFeed } from './getFeed';
import { TFeed } from './types';
import { getOrderById } from './getFeedById';

const initialState: TFeed = {
  orders: [],
  isLoading: false,
  error: '',
  feed: {
    totalToday: 0,
    total: 0
  }
};

export const FeedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  selectors: {
    selectOrders: (state) => state.orders,
    selectLoading: (state) => state.isLoading,
    selectInfo: (state) => state.feed
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeed.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.feed.total = action.payload.total;
      state.feed.totalToday = action.payload.totalToday;
    });

    builder.addCase(getOrderById.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const { selectOrders, selectLoading, selectInfo } = FeedSlice.selectors;
