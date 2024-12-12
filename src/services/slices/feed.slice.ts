import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IFeedSlice {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
}

const initialState: IFeedSlice = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed(state, action: PayloadAction<Omit<IFeedSlice, 'isLoading'>>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setFeedLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      return state;
    }
  }
});

export const { setFeed, setFeedLoading } = feedSlice.actions;
export const FeedReducer = feedSlice.reducer;
