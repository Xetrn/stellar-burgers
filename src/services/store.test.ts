import { expect, describe, test } from '@jest/globals';
import { constructorIngredientSlice as constructor } from './slices/constructorIngredientSlice';
import { feedsSlice as feeds } from './slices/feedsSlice';
import { ingredientsSlice as ingredients } from './slices/ingredientsSlice';
import { newOrderSlice as newOrder } from './slices/newOrderSlice';
import { userOrdersSlice as userOrders } from './slices/userOrdersSlice';
import { userSlice as user } from './slices/userSlice';

describe('Проверка состояния по умолчанию всех редьюсеров', () => {
  test('Состояние по умолчанию ingredientsReducer', () => {
    const initialState = ingredients.reducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      ingredients: [],
      loading: false,
      error: null,
    });
  });

  test('Состояние по умолчанию feedsReducer', () => {
    const initialState = feeds.reducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: undefined
    });
  });

  test('Состояние по умолчанию constructorIngredientReducer', () => {
    const initialState = constructor.reducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('Состояние по умолчанию newOrderReducer', () => {
    const initialState = newOrder.reducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      orderRequest: false,
      orderModalData: null,
      error: undefined
    });
  });

  test('Состояние по умолчанию userReducer', () => {
    const initialState = user.reducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      isAuthChecked: false,
      user: {
        email: '',
        name: ''
      },
      error: ''
    });
  });

  test('Состояние по умолчанию userOrdersReducer', () => {
    const initialState = userOrders.reducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      orders: [],
      isLoading: true
    });
  });
});
