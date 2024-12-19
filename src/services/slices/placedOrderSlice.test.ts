import { expect, test } from '@jest/globals';
import {
  placedOrdersSlice,
  initialState,
  TPlacedOrdersSlice,
  getPlacedOrders
} from '../slices/placedOrdersSlice';
import { TOrder } from '../../utils/types';

// Моковые данные
const mockPlacedOrders: TOrder[] = [
  {
    _id: '66ed6ad7119d45001b507edb',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-09-20T12:29:48.229Z',
    updatedAt: '2024-09-20T12:29:48.709Z',
    number: 53442,
    ingredients: ['643d69a5c3f7b9001cfa093c']
  },
  {
    _id: '66ed7358119d45001b507ef4',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-09-20T13:06:32.642Z',
    updatedAt: '2024-09-20T13:06:33.485Z',
    number: 53445,
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
  }
];

describe('Тестирование слайса placedOrdersSlice', () => {
  test('запрос заказов - в процессе загрузки', () => {
    const action = { type: getPlacedOrders.pending.type };
    const newState = placedOrdersSlice.reducer(initialState, action);
    const expectedState: TPlacedOrdersSlice = {
      ...initialState,
      isLoading: true
    };
    expect(newState).toEqual(expectedState);
  });

  test('запрос заказов - успешная загрузка', () => {
    const action = {
      type: getPlacedOrders.fulfilled.type,
      payload: mockPlacedOrders
    };
    const newState = placedOrdersSlice.reducer(initialState, action);
    const expectedState: TPlacedOrdersSlice = {
      ...initialState,
      orders: mockPlacedOrders
    };
    expect(newState).toEqual(expectedState);
  });

  test('запрос заказов - ошибка загрузки', () => {
    const action = { type: getPlacedOrders.rejected.type };
    const newState = placedOrdersSlice.reducer(initialState, action);
    const expectedState: TPlacedOrdersSlice = {
      ...initialState,
      error: 'Oшибка загрузки заказов'
    };
    expect(newState).toEqual(expectedState);
  });
});
