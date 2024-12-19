import { expect, test } from '@jest/globals';
import {
  createOrder,
  createOrderSlice,
  initialState,
  resetOrder
} from '../slices/create-order';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '66ed7358119d45001b507ef4',
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2024-12-19T16:53:31.680Z',
  updatedAt: '2024-12-19T16:53:31.680Z',
  number: 53445,
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
};

const mockError = 'Ошибка при создании заказа';

describe('Check create order api', () => {
  test('Initial state', () => {
    expect(createOrderSlice.reducer(undefined, { type: 'test' })).toEqual(
      initialState
    );
  });

  test('createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const newState = createOrderSlice.reducer(initialState, action);
    const expectedState = {
      ...initialState,
      isLoadingCreateOrder: true
    };
    expect(newState).toEqual(expectedState);
  });

  test('createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const newState = createOrderSlice.reducer(initialState, action);
    const expectedState = {
      ...initialState,
      orderModalData: mockOrder,
      isLoadingCreateOrder: false
    };
    expect(newState).toEqual(expectedState);
  });

  test('createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: mockError }
    };
    const newState = createOrderSlice.reducer(initialState, action);
    const expectedState = {
      ...initialState,
      error: mockError,
      isLoadingCreateOrder: false
    };
    expect(newState).toEqual(expectedState);
  });

  test('Reset state', () => {
    const modifiedState = {
      isLoadingCreateOrder: true,
      orderModalData: mockOrder,
      error: 'Ошибка'
    };
    const action = resetOrder();
    const newState = createOrderSlice.reducer(modifiedState, action);
    expect(newState).toEqual(initialState);
  });
});
