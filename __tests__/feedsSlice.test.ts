import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  feedsSlice,
  fetchFeeds
} from '../src/services/feedsSlice';
import { requestId, errorMessage, mockOrders, mockFeedResponse } from './mocks';

describe('Тесты проверяющие работу feedsReducer', () => {
  test('Проверка начального состояния', () => {
    const state = feedsSlice.reducer(undefined, { type: 'unknown' });
    expect(state).toStrictEqual(initialState);
  });

  describe('Тестирование асинхронного экшена: fetchFeeds', () => {
    test('Обработка состояния загрузки', () => {
      const action = fetchFeeds.pending(requestId);
      const state = feedsSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    test('Обработка успешного запроса', async () => {
      const action = fetchFeeds.fulfilled(mockFeedResponse, requestId);
      const state = feedsSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toStrictEqual(mockOrders);
      expect(state.total).toBe(123);
      expect(state.totalToday).toBe(50);
    });

    test('Обработка ошибки запроса', async () => {
      const action = fetchFeeds.rejected(
        new Error(errorMessage),
        requestId,
        undefined
      );
      const state = feedsSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(false);
    });
  });
});
