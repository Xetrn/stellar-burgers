import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

interface TIngredientState {
  feedsData: TOrdersData;
  feedsError: string | null | undefined;
  isFeedsLoading: boolean;
}

const initialState: TIngredientState = {
  feedsData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  feedsError: null,
  isFeedsLoading: false
};

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsData: (store) => store.feedsData,
    getFeedsOrdersData: (store) => store.feedsData.orders,
    getFeedsTotalData: (store) => store.feedsData.total,
    getFeedsTotalTodayData: (store) => store.feedsData.totalToday,
    getFeedsError: (store) => store.feedsError,
    getFeedsLoading: (store) => store.isFeedsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isFeedsLoading = true;
        state.feedsError = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.feedsError = action.error.message;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedsData = action.payload;
        state.isFeedsLoading = false;
      });
  }
});

export const {
  getFeedsData,
  getFeedsOrdersData,
  getFeedsTotalData,
  getFeedsTotalTodayData,
  getFeedsError,
  getFeedsLoading
} = feedsSlice.selectors;
