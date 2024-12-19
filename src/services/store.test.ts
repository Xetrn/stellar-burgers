import { expect, describe, test } from '@jest/globals';
import ingredientsReducer from './slices/ingredientsSlice';
import feedsReducer from './slices/feedsSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import userOrderReducer from './slices/userOrderSlice';
import store from './store';

describe('Проверка состояния по умолчанию всех редьюсеров', () => {
  test('Проверка состояния хранилища по умолчанию', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null,
      },
      orders: {
        feeds: {
          orders: [],
          total: 0,
          totalToday: 0,
        },
        loading: false,
        error: null,
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
      },
      order: {
        orderData: [],
        orderModalData: null,
        orderError: null,
        orderRequest: false,
      },
      user: {
        data: null,
        isAuthenticated: false,
        isAuthChecked: false,
        loginUserError: null,
        loginUserRequest: false,
        registerUserError: null,
        registerUserRequest: false,
      },
      userOrder: {
        orders: [],
        isLoading: true,
      },
    });
  });

  test('Состояние по умолчанию ingredientsReducer', () => {
    const initialState = ingredientsReducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      ingredients: [],
      loading: false,
      error: null,
    });
  });

  test('Состояние по умолчанию feedsReducer', () => {
    const initialState = feedsReducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      feeds: {
        orders: [],
        total: 0,
        totalToday: 0,
      },
      loading: false,
      error: null,
    });
  });

  test('Состояние по умолчанию constructorReducer', () => {
    const initialState = constructorReducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  test('Состояние по умолчанию orderReducer', () => {
    const initialState = orderReducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      orderData: [],
      orderModalData: null,
      orderError: null,
      orderRequest: false,
    });
  });

  test('Состояние по умолчанию userReducer', () => {
    const initialState = userReducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      data: null,
      isAuthenticated: false,
      isAuthChecked: false,
      loginUserError: null,
      loginUserRequest: false,
      registerUserError: null,
      registerUserRequest: false,
    });
  });

  test('Состояние по умолчанию userOrderReducer', () => {
    const initialState = userOrderReducer(undefined, { type: '@INIT' });
    expect(initialState).toEqual({
      orders: [],
      isLoading: true,
    });
  });
});
