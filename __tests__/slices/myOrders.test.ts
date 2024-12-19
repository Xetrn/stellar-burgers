import { configureStore } from '@reduxjs/toolkit';
import {
  fetchMyOrders,
  getMyOrders,
  getMyOrdersError,
  getMyOrdersLoading,
  myOrdersSlice
} from '../../src/services/slices';

import {
  error,
  myOrdersMock,
  myOrdersState,
  initialMyOrdersState
} from '../../mocks/myOrders';

describe('Слайс заказов пользователя работает', () => {
  it('Конструктор инициализирован правильно', () => {
    const initialState = myOrdersSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual(initialMyOrdersState);
  });

  describe('Запрос заказов пользователя работает', () => {
    const store = configureStore({
      reducer: {
        [myOrdersSlice.name]: myOrdersSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
      Object.defineProperty(global, 'document', {
        value: {
          cookie: 'Bearer accessToken'
        },
        writable: true
      });
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = myOrdersSlice.reducer(initialMyOrdersState, {
        type: fetchMyOrders.pending.type
      });
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(myOrdersMock)
      });

      await store.dispatch(fetchMyOrders());
      const state = store.getState().myOrders;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBeFalsy();
      expect(state.orders).toEqual(myOrdersMock.orders);
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));

      await store.dispatch(fetchMyOrders());
      const state = store.getState().myOrders;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBeTruthy();
    });
  });

  describe('Селекторы работают', () => {
    const state = {
      [myOrdersSlice.name]: myOrdersSlice.reducer(myOrdersState, {
        type: 'UNKNOWN_ACTION'
      })
    };

    it('Селектор getMyOrders работает корректно', () => {
      expect(getMyOrders(state)).toEqual(myOrdersMock.orders);
    });

    it('Селектор getMyOrdersLoading работает корректно', () => {
      expect(getMyOrdersLoading(state)).toBeFalsy();
    });

    it('Селектор getMyOrdersError работает корректно', () => {
      expect(getMyOrdersError(state)).toBeNull();
    });
  });
});
