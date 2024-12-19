import { expect, test, describe } from '@jest/globals';
import {
  order1,
  mockOrders,
  requestId,
  errorMessage,
  mockNewOrderResponse,
  mockIngredientsIds,
  mockOrderResponse
} from './mocks';
import {
  initialState,
  ordersSlice,
  fetchOrderByNumber,
  fetchOrders,
  createOrder
} from '../src/services/ordersSlice';

describe('Тесты проверяющие работу ordersReducer', () => {
  test('Проверка начального состояния', () => {
    const state = ordersSlice.reducer(undefined, { type: 'unknown' });
    expect(state).toStrictEqual(initialState);
  });

  describe('Тестирование асинхронного экшена: createOrder', () => {
    test('Обработка состояния загрузки', () => {
      const action = createOrder.pending(requestId, mockIngredientsIds);
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    test('Обработка успешного запроса', () => {
      const action = createOrder.fulfilled(
        mockNewOrderResponse,
        requestId,
        mockIngredientsIds
      );
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });

    test('Обработка ошибки запроса', () => {
      const action = createOrder.rejected(
        new Error(errorMessage),
        requestId,
        mockIngredientsIds
      );
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('Тестирование асинхронного экшена: fetchOrders', () => {
    test('Обработка состояния загрузки', () => {
      const action = fetchOrders.pending(requestId);
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    test('Обработка успешного запроса', () => {
      const action = fetchOrders.fulfilled(mockOrders, requestId);
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.orders).toStrictEqual(mockOrders);
    });

    test('Обработка ошибки запроса', () => {
      const action = fetchOrders.rejected(new Error(errorMessage), requestId);
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('Тестирование асинхронного экшена: fetchOrderByNumber', () => {
    test('Обработка состояния загрузки', () => {
      const action = fetchOrderByNumber.pending(requestId, order1.number);
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    test('Обработка успешного запроса', () => {
      const action = fetchOrderByNumber.fulfilled(
        mockOrderResponse,
        requestId,
        order1.number
      );
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });

    test('Обработка ошибки запроса', () => {
      const action = fetchOrderByNumber.rejected(
        new Error(errorMessage),
        requestId,
        order1.number
      );
      const state = ordersSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });
});
