import { configureStore } from '@reduxjs/toolkit';
import {
  newOrderReducer,
  resetOrder,
  takeNewOrder,
  TNewOrderState
} from './newOrderSlice';
import { initialState as newOrderInitialState } from './newOrderSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      newOrder: newOrderReducer
    },
    preloadedState: {
      newOrder: mockedOrderData
    }
  });

const mockedOrderData: TNewOrderState = {
  orderRequest: false,
  orderModalData: {
    _id: '66fad4f207d06e001c3719c3',
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    createdAt: '2024-09-30T16:42:26.241Z',
    updatedAt: '2024-09-30T16:42:27.058Z',
    number: 54710,
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ]
  },
  error: undefined
};

describe('new order slice', () => {
  describe('initial state', () => {
    test('', () => {
      const initialState = newOrderReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      });

      expect(initialState).toEqual(newOrderInitialState);
    });
  });

  describe('selectors', () => {
    const store = createTestStore();

    test('orderRequestSelector should return orderRequest state', () => {
      const orderRequest = store.getState().newOrder.orderRequest;

      expect(orderRequest).toBe(false);
    });

    test('orderModalDataSelector should return order modal data', () => {
      const orderModalData = store.getState().newOrder.orderModalData;

      expect(orderModalData).toEqual(mockedOrderData.orderModalData);
    });
  });

  describe('extra reducers', () => {
    const store = createTestStore();

    test('handle pending state', () => {
      store.dispatch({
        type: takeNewOrder.pending.type
      });
      const state = store.getState();

      expect(state.newOrder.orderRequest).toBe(true);
    });

    test('handle fulfilled state', () => {
      store.dispatch({
        type: takeNewOrder.fulfilled.type,
        payload: { order: mockedOrderData.orderModalData }
      });
      const state = store.getState();

      expect(state.newOrder.orderRequest).toBe(false);
      expect(state.newOrder.orderModalData).toEqual(
        mockedOrderData.orderModalData
      );
    });

    test('handle rejected state', () => {
      const errorMessage = 'error';
      store.dispatch({
        type: takeNewOrder.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.newOrder.error).toBe(errorMessage);
    });
  });

  describe('reducers', () => {
    test('handle resetOrder action', () => {
      const store = createTestStore();
      store.dispatch(resetOrder());
      const state = store.getState();
      
      expect(state.newOrder).toEqual(newOrderInitialState);
    });
  });
});
