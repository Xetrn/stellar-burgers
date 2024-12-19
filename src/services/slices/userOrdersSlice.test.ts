import { configureStore } from '@reduxjs/toolkit';
import {
  fetchUserOrders,
  getOrdersSelector,
  TOrderState,
  userOrdersReducer
} from './userOrdersSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      userOrders: userOrdersReducer
    },
    preloadedState: {
      userOrders: mockedUserOrdersData
    }
  });

const mockedUserOrdersData: TOrderState = {
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

describe('user orders slice', () => {
  describe('selectors', () => {
    test('getOrdersSelector should correctly select user orders', () => {
      const store = createTestStore();
      const state = store.getState();
      const userOrders = getOrdersSelector(state);

      expect(userOrders).toEqual(mockedUserOrdersData.orders);
    });
  });

  describe('extra reducers', () => {
    const store = createTestStore();

    test('handle pending state', () => {
      store.dispatch({ type: fetchUserOrders.pending.type });
      const state = store.getState();

      expect(state.userOrders.isLoading).toBe(true);
    });

    test('handle fulfilled state', () => {
      store.dispatch({
        type: fetchUserOrders.fulfilled.type,
        payload: mockedUserOrdersData.orders
      });
      const state = store.getState();

      expect(state.userOrders.isLoading).toBe(false);
      expect(state.userOrders.orders).toEqual(mockedUserOrdersData.orders);
    });

    test('handle rejected state', () => {
      store.dispatch({ type: fetchUserOrders.rejected.type });
      const state = store.getState();

      expect(state.userOrders.isLoading).toBe(false);
    });
  });
});
