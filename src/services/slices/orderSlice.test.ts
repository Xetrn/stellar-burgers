import { expect, test } from '@jest/globals';
import {
  fetchOrderByNumber,
  orderSlice,
  initialState,
  TOrderSlice,
  postOrder
} from '../slices/orderSlice';
import { TOrderResponse, TNewOrderResponse } from '../../utils/burger-api';

// Моковые данные для тестирования
const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: [
    {
      _id: '66ed7358119d45001b507ef4',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-09-20T13:06:32.642Z',
      updatedAt: '2024-09-20T13:06:33.485Z',
      number: 53445,
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
    },
    {
      _id: '66ed6ad7119d45001b507edb',
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2024-09-20T12:29:48.229Z',
      updatedAt: '2024-09-20T12:29:48.709Z',
      number: 53442,
      ingredients: ['643d69a5c3f7b9001cfa093c']
    }
  ]
};

const mockOrderToPostResponse: TNewOrderResponse = {
  success: true,
  order: {
    _id: '66ed7358119d45001b507ef4',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-09-20T13:06:32.642Z',
    updatedAt: '2024-09-20T13:06:33.485Z',
    number: 53445,
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
  },
  name: 'Evgeniya'
};

describe('Тестирование слайса orderSlice', () => {
  test('запрос заказа по номеру - в процессе', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const newState = orderSlice.reducer(initialState, action);
    const expectedState: TOrderSlice = { ...initialState, isLoading: true };
    expect(newState).toEqual(expectedState);
  });

  test('запрос заказа по номеру - успешный', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrderResponse
    };
    const newState = orderSlice.reducer(initialState, action);
    const expectedState: TOrderSlice = {
      ...initialState,
      orderData: mockOrderResponse.orders[0]
    };
    expect(newState).toEqual(expectedState);
  });

  test('запрос заказа по номеру - ошибка', () => {
    const action = { type: fetchOrderByNumber.rejected.type };
    const newState = orderSlice.reducer(initialState, action);
    const expectedState: TOrderSlice = {
      ...initialState,
      fetchOrderByIdError: 'Ошибка загрузки заказа'
    };
    expect(newState).toEqual(expectedState);
  });

  test('размещение нового заказа - в процессе', () => {
    const action = { type: postOrder.pending.type };
    const newState = orderSlice.reducer(initialState, action);
    const expectedState: TOrderSlice = { ...initialState, orderRequest: true };
    expect(newState).toEqual(expectedState);
  });

  test('размещение нового заказа - успешный', () => {
    const action = {
      type: postOrder.fulfilled.type,
      payload: mockOrderToPostResponse
    };
    const newState = orderSlice.reducer(initialState, action);
    const expectedState: TOrderSlice = {
      ...initialState,
      orderData: mockOrderToPostResponse.order
    };
    expect(newState).toEqual(expectedState);
  });

  test('размещение нового заказа - ошибка', () => {
    const action = { type: postOrder.rejected.type };
    const newState = orderSlice.reducer(initialState, action);
    const expectedState: TOrderSlice = {
      ...initialState,
      postOrderError: 'Ошибка размещения заказа'
    };
    expect(newState).toEqual(expectedState);
  });
});
