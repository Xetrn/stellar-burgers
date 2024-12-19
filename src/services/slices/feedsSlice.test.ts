import { expect, describe, test } from '@jest/globals';
import feedsReducer, { fetchFeeds } from '../slices/feedsSlice';

const mockOrders = {
  success: true,
  total: 10,
  totalToday: 1,
  orders: [
    {
      _id: '67627d2e750864001d3722e5',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Метеоритный бургер',
      createdAt: '2024-12-18T07:43:42.331Z',
      updatedAt: '2024-12-18T07:43:43.383Z',
      number: 63153
    }
  ]
};

const initialState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

describe('Тесты для feedsSlice', () => {
  test('Инициализация: состояние по умолчанию', () => {
    const state = feedsReducer(undefined, { type: '@INIT' });
    expect(state).toEqual(initialState);
  });

  test('fetchFeeds.pending изменяет loading на true', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('fetchFeeds.fulfilled обновляет feeds и сбрасывает loading', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockOrders };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      feeds: mockOrders,
      loading: false,
      error: null
    });
  });

  test('fetchFeeds.rejected устанавливает ошибку', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      payload: 'Ошибка загрузки заказов'
    };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка загрузки заказов'
    });
  });
});
