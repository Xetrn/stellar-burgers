import { expect, describe, test } from '@jest/globals';
import { newOrderSlice, placeNewOrder, resetOrder } from '../slices/newOrderSlice';
import { TNewOrderState } from '../slices/newOrderSlice';

const mockOrder = {
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
};

const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

describe('Тестирование newOrderSlice', () => {
  const orderReducer = newOrderSlice.reducer;

  test('действие resetOrder сбрасывает состояние', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      orderModalData: mockOrder,
      error: 'Ошибка'
    };
    const newState = orderReducer(state, resetOrder());
    expect(newState).toEqual(initialState);
  });

  test('placeNewOrder.pending изменяет orderRequest на true', () => {
    const action = { type: placeNewOrder.pending.type };
    const newState = orderReducer(initialState, action);
    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('placeNewOrder.fulfilled сохраняет данные заказа и сбрасывает orderRequest', () => {
    const action = { type: placeNewOrder.fulfilled.type, payload: { order: mockOrder } };
    const newState = orderReducer(initialState, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toEqual(mockOrder);
  });

  test('placeNewOrder.rejected сохраняет ошибку', () => {
    const action = { type: placeNewOrder.rejected.type, error: { message: 'Ошибка при создании заказа' } };
    const newState = orderReducer(initialState, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('Ошибка при создании заказа');
  });

  test('getOrderRequest возвращает состояние orderRequest', () => {
    const state = {
      newOrder: { ...initialState, orderRequest: true }
    };
    expect(newOrderSlice.selectors.getOrderRequest(state)).toBe(true);
  });

  test('getOrderModalData возвращает данные заказа', () => {
    const state = {
      newOrder: { ...initialState, orderModalData: mockOrder }
    };
    expect(newOrderSlice.selectors.getOrderModalData(state)).toEqual(mockOrder);
  });
});
