import { configureStore } from '@reduxjs/toolkit';
import {
  TFeedsState,
  feedsSlice,
  selectFeedOrders,
  selectTotalOrders,
  selectTotalOrdersToday,
  getFeeds
} from './ordersFeedSlice';

const createStore = () =>
  configureStore({
    reducer: {
      feeds: feedsSlice.reducer
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

describe('Тестирование слайса feed', () => {
  describe('Проверка селекторов', () => {
    const store = createStore();
    store.dispatch({
      type: getFeeds.fulfilled.type,
      payload: mockFeedsData
    });
    const state = store.getState();

    test('Селектор для получения списка заказов', () => {
      const orders = selectFeedOrders(state);
      expect(orders).toEqual(state.feeds.orders);
    });

    test('Селектор для получения количества заказов за сегодня', () => {
      const totalTodayOrders = selectTotalOrdersToday(state);
      expect(totalTodayOrders).toEqual(state.feeds.totalToday);
    });

    test('Селектор для получения общего количества заказов', () => {
      const totalOrders = selectTotalOrders(state);
      expect(totalOrders).toEqual(state.feeds.total);
    });
  });

  describe('Проверка экстра-редьюсеров', () => {
    const store = createStore();

    test('Проверка состояния при запросе (pending)', () => {
      store.dispatch({
        type: getFeeds.pending.type
      });
      const state = store.getState();

      expect(state.feeds.loading).toBe(true);
      expect(state.feeds.error).toBe(undefined);
    });

    test('Проверка состояния при успешном запросе (fulfilled)', () => {
      store.dispatch({
        type: getFeeds.fulfilled.type,
        payload: mockFeedsData
      });
      const state = store.getState();

      expect(state.feeds.loading).toBe(false);
      expect(state.feeds.total).toBe(1);
      expect(state.feeds.totalToday).toBe(1);
      expect(state.feeds.orders).toEqual(mockFeedsData.orders);
    });

    test('Проверка состояния при ошибке (rejected)', () => {
      const errorMessage = 'Ошибка запроса';
      store.dispatch({
        type: getFeeds.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.feeds.orders).toEqual([]);
      expect(state.feeds.loading).toBe(false);
      expect(state.feeds.error).toEqual(errorMessage);
    });
  });
});
