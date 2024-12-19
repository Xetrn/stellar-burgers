import { expect, test } from '@jest/globals';
import {
  getUserOrdersRequest,
  initialState,
  TOrdersState,
  userOrdersSlice
} from '../slices/user-orders';
import { TOrder } from '../../utils/types';

const mockUserOrders: TOrder[] = [
  {
    _id: '12345',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-12-19T16:53:31.680Z',
    updatedAt: '2024-12-19T16:53:31.680Z',
    number: 1001,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: '67890',
    status: 'pending',
    name: 'Краторный бургер',
    createdAt: '2024-12-19T16:53:31.680Z',
    updatedAt: '2024-12-19T16:53:31.680Z',
    number: 1002,
    ingredients: ['ingredient3', 'ingredient4']
  }
];

const ERROR_MESSAGE = 'Ошибка загрузки заказов';

describe('Check user orders', () => {
  test('getUserOrdersRequest.pending', () => {
    const action = { type: getUserOrdersRequest.pending.type };
    const newState = userOrdersSlice.reducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      isLoadingUserOrders: true
    };
    expect(newState).toEqual(expectedState);
  });

  test('getUserOrdersRequest.fulfilled', () => {
    const action = {
      type: getUserOrdersRequest.fulfilled.type,
      payload: mockUserOrders
    };
    const newState = userOrdersSlice.reducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      orders: mockUserOrders,
      isLoadingUserOrders: false
    };
    expect(newState).toEqual(expectedState);
  });

  test('getUserOrdersRequest.rejected', () => {
    const action = {
      type: getUserOrdersRequest.rejected.type,
      error: { message: ERROR_MESSAGE }
    };
    const newState = userOrdersSlice.reducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      isLoadingUserOrders: false,
      error: ERROR_MESSAGE
    };
    expect(newState).toEqual(expectedState);
  });
});
