import { configureStore } from '@reduxjs/toolkit';
import { TFeed } from '@utils-types';
import { feedReducer, fetchFeedAction } from './feedSlice';

describe('feedSlice', () => {
  const initialState = {
    feed: null,
    isLoading: false,
    error: null
  };

  const expectedPendingState = {
    ...initialState,
    isLoading: true
  };

  const mockFeed: TFeed = {
    success: true,
    orders: [
      {
        _id: '6762f3f9750864001d3725ca',
        ingredients: [
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-12-18T16:10:33.448Z',
        updatedAt: '2024-12-18T16:10:34.329Z',
        number: 63237
      },
      {
        _id: '6762f399750864001d3725c9',
        ingredients: [
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный био-марсианский люминесцентный бургер',
        createdAt: '2024-12-18T16:08:57.570Z',
        updatedAt: '2024-12-18T16:08:58.303Z',
        number: 63236
      }
    ],
    total: 62863,
    totalToday: 168
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchFeedAction', () => {
    it('должен обрабатывать загрузку ленты заказов', () => {
      const store = configureStore({
        reducer: { feed: feedReducer }
      });

      store.dispatch(fetchFeedAction());
      const state = store.getState().feed;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен получать ленту заказов', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            ...mockFeed
          })
      });

      const store = configureStore({
        reducer: { feed: feedReducer }
      });

      await store.dispatch(fetchFeedAction());
      const state = store.getState().feed;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.feed).toEqual(mockFeed);
    });

    it('должен обрабатывать ошибку получения ленты заказов', async () => {
      const errorMessage = 'Failed to fetch';
      global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

      const store = configureStore({
        reducer: { feed: feedReducer }
      });

      await store.dispatch(fetchFeedAction());
      const state = store.getState().feed;

      expect(state.isLoading).toBe(false);
      expect(state.feed).toEqual(null);
      expect(state.error).toBe(errorMessage);
    });
  });
});
