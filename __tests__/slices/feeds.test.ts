import { configureStore } from '@reduxjs/toolkit';
import {
  feedsSlice,
  fetchFeeds,
  getFeedsState,
  getOrders,
  getOrdersLoading,
  getTotalFeeds,
  getTotalToday
} from '../../src/services/slices';

import {
  error,
  feedsState,
  initialFeedsState,
  mockOrders
} from '../../mocks/feeds';

describe('Слайс ленты заказов работает', () => {
  it('Конструктор инициализирован правильно', () => {
    const initialState = feedsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual(initialFeedsState);
  });

  describe('Запрос заказов работает', () => {
    const store = configureStore({
      reducer: {
        [feedsSlice.name]: feedsSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = feedsSlice.reducer(initialFeedsState, {
        type: fetchFeeds.pending.type
      });
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockOrders)
      });

      await store.dispatch(fetchFeeds());
      const state = store.getState().feeds;

      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockOrders.orders);
      expect(state.total).toBe(5);
      expect(state.totalToday).toBe(2);
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));

      await store.dispatch(fetchFeeds());
      const state = store.getState().feeds;

      expect(state.loading).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Селекторы работают', () => {
    const state = {
      [feedsSlice.name]: feedsSlice.reducer(feedsState, {
        type: 'UNKNOWN_ACTION'
      })
    };

    it('Селектор getFeedsState работает корректно', () => {
      expect(getFeedsState(state)).toEqual(state.feeds);
    });

    it('Селектор getOrders работает корректно', () => {
      expect(getOrders(state)).toEqual(mockOrders.orders);
    });

    it('Селектор getOrdersLoading работает корректно', () => {
      expect(getOrdersLoading(state)).toBeFalsy();
    });

    it('Селектор getTotalFeeds работает корректно', () => {
      expect(getTotalFeeds(state)).toBe(5);
    });

    it('Селектор getTotalToday работает корректно', () => {
      expect(getTotalToday(state)).toBe(2);
    });
  });
});
