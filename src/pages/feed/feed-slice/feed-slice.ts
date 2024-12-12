import { createReducer, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../../../components/burger-ingredients/ingredients-slice/getIngredients';
import { TFeed } from './types';
import { getFeed, getOrderById, getUserOrders } from './actions';

const initialState: TFeed = {
  orders: [],
  isLoading: false,
  error: '',
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
    selectLoading: (state) => state.isLoading,
    selectLoadingUser: (state) => state.loadingUser,
    selectInfo: (state) => state.feed,
    selectUserOrders: (state) => state.userOrders
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
