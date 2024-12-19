import { expect, describe, test } from '@jest/globals';
import { userOrdersSlice, getUserOrders } from '../slices/userOrdersSlice';
import { TOrdersState } from '../slices/userOrdersSlice';

const mockUserOrders = [
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
];

const initialState: TOrdersState = {
  orders: [],
  isLoading: true
};

describe('Тестирование userOrdersSlice', () => {
  const ordersReducer = userOrdersSlice.reducer;

  test('getUserOrders.pending устанавливает флаг загрузки', () => {
    const action = { type: getUserOrders.pending.type };
    const newState = ordersReducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      isLoading: true
    };
    expect(newState).toEqual(expectedState);
  });

  test('getUserOrders.fulfilled успешно загружает заказы', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockUserOrders
    };
    const newState = ordersReducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      orders: mockUserOrders,
      isLoading: false
    };
    expect(newState).toEqual(expectedState);
  });

  test('getUserOrders.rejected завершает загрузку с флагом isLoading = false', () => {
    const action = { type: getUserOrders.rejected.type };
    const newState = ordersReducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      isLoading: false
    };
    expect(newState).toEqual(expectedState);
  });

  test('listOfOrders возвращает список заказов', () => {
    const state = {
      orders: {
        orders: mockUserOrders,
        isLoading: false
      }
    };
    expect(userOrdersSlice.selectors.listOfOrders(state)).toEqual(mockUserOrders);
  });
});
