import { configureStore } from '@reduxjs/toolkit';
import feedsReducer, {
  fetchFeeds,
  getOrders,
  getOrdersTotal,
  getOrdersTotalToday,
  getLoadingFeed
} from './feedSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      feeds: feedsReducer
    }
  });

const mockFeedsData = {
  feedOrders: [
    {
      id: 1,
      name: 'Order 1',
      price: 100
    },
    {
      id: 2,
      name: 'Order 2',
      price: 200
    }
  ],
  total: 500,
  totalToday: 50,
  loading: false,
  error: null
};

describe('feedSlice', () => {
  describe('selectors', () => {
    const store = createTestStore();
    store.dispatch({
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: mockFeedsData.feedOrders,
        total: mockFeedsData.total,
        totalToday: mockFeedsData.totalToday
      }
    });
    const state = store.getState();

    test('getOrders selector', () => {
      const selectedOrders = getOrders({ feeds: state.feeds });
      expect(selectedOrders).toEqual(state.feeds.feedOrders);
    });

    test('getOrdersTotal selector', () => {
      const totalOrders = getOrdersTotal({ feeds: state.feeds });
      expect(totalOrders).toEqual(state.feeds.total);
    });

    test('getOrdersTotalToday selector', () => {
      const totalTodayOrders = getOrdersTotalToday({ feeds: state.feeds });
      expect(totalTodayOrders).toEqual(state.feeds.totalToday);
    });

    test('getLoadingFeed selector', () => {
      const loading = getLoadingFeed({ feeds: state.feeds });
      expect(loading).toEqual(state.feeds.loading);
    });
  });

  describe('extraReducers', () => {
    const store = createTestStore();

    test('pending', () => {
      store.dispatch({
        type: fetchFeeds.pending.type
      });
      const state = store.getState();
      expect(state.feeds.loading).toBe(true);
      expect(state.feeds.error).toBeNull();
    });

    test('fulfilled', () => {
      store.dispatch({
        type: fetchFeeds.fulfilled.type,
        payload: {
          orders: mockFeedsData.feedOrders,
          total: mockFeedsData.total,
          totalToday: mockFeedsData.totalToday
        }
      });
      const state = store.getState();
      expect(state.feeds.loading).toBe(false);
      expect(state.feeds.feedOrders).toEqual(mockFeedsData.feedOrders);
      expect(state.feeds.total).toBe(mockFeedsData.total);
      expect(state.feeds.totalToday).toBe(mockFeedsData.totalToday);
    });

    test('rejected', () => {
      const errorMessage = 'Failed to fetch feeds';
      store.dispatch({
        type: fetchFeeds.fulfilled.type,
        payload: {
          orders: mockFeedsData.feedOrders,
          total: mockFeedsData.total,
          totalToday: mockFeedsData.totalToday
        }
      });

      let state = store.getState();
      expect(state.feeds.feedOrders).toEqual(mockFeedsData.feedOrders);

      store.dispatch({
        type: fetchFeeds.rejected.type,
        error: { message: errorMessage }
      });

      state = store.getState();

      expect(state.feeds.feedOrders).toEqual(mockFeedsData.feedOrders);
      expect(state.feeds.loading).toBe(false);
      expect(state.feeds.error).toEqual(errorMessage);
    });
  });
});
