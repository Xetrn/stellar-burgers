import { configureStore } from '@reduxjs/toolkit';
import {
  TUserOrdersState,
  selectOrderList,
  userOrdersSlice,
  getUserOrders
} from './userOrdersSlice';

const createStore = () =>
  configureStore({
    reducer: {
      userOrders: userOrdersSlice.reducer
    },
    preloadedState: {
      userOrders: mockUserOrdersData
    }
  });

const mockUserOrdersData: TUserOrdersState = {
  orders: [
    {
      _id: '66f8ff82119d45001b50a3a3',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-09-29T07:19:30.697Z',
      updatedAt: '2024-09-29T07:19:31.526Z',
      number: 54538
    }
  ],
  isLoading: false
};

describe('Тесты слайса заказов пользователя', () => {
  describe('Проверка селекторов', () => {
    test('Корректный выбор списка заказов', () => {
      const store = createStore();
      const state = store.getState();
      const ordersList = selectOrderList(state);

      expect(ordersList).toEqual(mockUserOrdersData.orders);
    });
  });

  describe('Тесты для extraReducers', () => {
    const store = createStore();

    test('Проверка состояния при запросе (pending)', () => {
      store.dispatch({ type: getUserOrders.pending.type });
      const state = store.getState();

      expect(state.userOrders.isLoading).toBe(true);
    });

    test('Проверка состояния при успешном ответе (fulfilled)', () => {
      store.dispatch({
        type: getUserOrders.fulfilled.type,
        payload: mockUserOrdersData.orders
      });
      const state = store.getState();

      expect(state.userOrders.isLoading).toBe(false);
      expect(state.userOrders.orders).toEqual(mockUserOrdersData.orders);
    });

    test('Проверка состояния при ошибке (rejected)', () => {
      store.dispatch({ type: getUserOrders.rejected.type });
      const state = store.getState();

      expect(state.userOrders.isLoading).toBe(false);
    });
  });
});
