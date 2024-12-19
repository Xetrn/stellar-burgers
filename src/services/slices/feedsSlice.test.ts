import { expect, describe, test } from '@jest/globals';
import { feedsSlice, getAllFeeds } from '../slices/feedsSlice';

const mockFeedsData = {
  orders: [
    {
      _id: '1',
      name: 'Бургер 1',
      status: 'done',
      ingredients: ['ingredient1', 'ingredient2'],
      createdAt: '2024-12-18T10:00:00.000Z',
      updatedAt: '2024-12-18T11:00:00.000Z',
      number: 12345,
    },
    {
      _id: '2',
      name: 'Бургер 2',
      status: 'in progress',
      ingredients: ['ingredient3', 'ingredient4'],
      createdAt: '2024-12-18T11:00:00.000Z',
      updatedAt: '2024-12-18T12:00:00.000Z',
      number: 12346,
    },
  ],
  total: 10,
  totalToday: 2,
};

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: undefined,
};

describe('Тесты для feedsSlice', () => {
  const feedsReducer = feedsSlice.reducer;

  test('Инициализация: состояние по умолчанию', () => {
    const state = feedsReducer(undefined, { type: '@INIT' });
    expect(state).toEqual(initialState);
  });

  test('getAllFeeds.pending устанавливает isLoading в true', () => {
    const action = { type: getAllFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: undefined,
    });
  });

  test('getAllFeeds.fulfilled обновляет данные и сбрасывает isLoading', () => {
    const action = { type: getAllFeeds.fulfilled.type, payload: mockFeedsData };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      orders: mockFeedsData.orders,
      total: mockFeedsData.total,
      totalToday: mockFeedsData.totalToday,
      isLoading: false,
      error: undefined,
    });
  });

  test('getAllFeeds.rejected сбрасывает данные и устанавливает ошибку', () => {
    const action = {
      type: getAllFeeds.rejected.type,
      error: { message: 'Ошибка загрузки' },
    };
    const state = feedsReducer(initialState, action);
    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: 'Ошибка загрузки',
    });
  });

  test('Тестирование селекторов: getOrdersFeeds, getTotalFeeds, getTotalTodayFeeds', () => {
    const state = {
      feeds: {
        orders: mockFeedsData.orders,
        total: mockFeedsData.total,
        totalToday: mockFeedsData.totalToday,
        isLoading: false,
        error: undefined,
      },
    };

    expect(feedsSlice.selectors.getOrdersFeeds(state)).toEqual(mockFeedsData.orders);
    expect(feedsSlice.selectors.getTotalFeeds(state)).toEqual(mockFeedsData.total);
    expect(feedsSlice.selectors.getTotalTodayFeeds(state)).toEqual(mockFeedsData.totalToday);
  });
});
