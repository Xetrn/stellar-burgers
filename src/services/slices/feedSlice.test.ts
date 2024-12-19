import { configureStore } from '@reduxjs/toolkit';
import {
  feedsReducer,
  fetchFeeds,
  ordersSelector,
  TFeedsState,
  totalOrdersSelector,
  totalTodayOrdersSelector
} from './feedsSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      feeds: feedsReducer
    }
  });

const mockFeedsData: TFeedsState = {
  orders: [
    {
      _id: '66f8ff82119d45001b50a3a3',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-09-29T07:19:30.697Z',
      updatedAt: '2024-09-29T07:19:31.526Z',
      number: 54538
    }
  ],
  error: undefined,
  loading: false,
  total: 1,
  totalToday: 1
};

describe('feed slice', () => {
  describe('selectors', () => {
    const store = createTestStore();
    store.dispatch({
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedsData
    });
    const state = store.getState();
    
    test('ordersSelector should return the list of orders', () => {
      const selectedOrders = ordersSelector(state);
      expect(selectedOrders).toEqual(state.feeds.orders);
    });

    test('totalTodayOrdersSelector should return the total number of today\'s orders', () => {
      const totalTodayOrders = totalTodayOrdersSelector(state);
      expect(totalTodayOrders).toEqual(state.feeds.totalToday);
    });

    test('totalOrdersSelector should return the total number of orders', () => {
      const totalOrders = totalOrdersSelector(state);
      expect(totalOrders).toEqual(state.feeds.total);
    });
  });

  describe('extraReducers', () => {
    const store = createTestStore();

    test('handle pending state', () => {
      store.dispatch({
        type: fetchFeeds.pending.type
      });
      const state = store.getState();

      expect(state.feeds.loading).toBe(true);
      expect(state.feeds.error).toBe(undefined);
    });

    test('handle fulfilled state', () => {
      store.dispatch({
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsData
      });
      const state = store.getState();

      expect(state.feeds.loading).toBe(false);
      expect(state.feeds.total).toBe(1);
      expect(state.feeds.totalToday).toBe(1);
      expect(state.feeds.orders).toEqual(mockFeedsData.orders);
    });

    test('handle rejected state', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: fetchFeeds.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      
      expect(state.feeds.orders).toEqual([]);
      expect(state.feeds.loading).toBe(false);
      expect(state.feeds.error).toEqual(errorMessage);
    });
  });
});
