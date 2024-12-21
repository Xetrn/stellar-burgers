import { configureStore } from '@reduxjs/toolkit';
import {
  initialState as initialNewOrderState,
  resetOrderState as resetOrder,
  TNewOrderState as OrderState,
  createOrderSlice as orderReducer,
  createOrder
} from './createOrderSlice';

const createStore = () =>
  configureStore({
    reducer: {
      newOrder: orderReducer.reducer
    },
    preloadedState: {
      newOrder: initialOrderData
    }
  });

const initialOrderData: OrderState = {
  isRequestInProgress: false,
  orderDetails: {
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
  orderErrorMessage: undefined
};

describe('Тестирование редьюсера нового заказа', () => {
  describe('Проверка начального состояния', () => {
    test('Должен соответствовать начальному состоянию', () => {
      const state = orderReducer.reducer(undefined, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialNewOrderState);
    });
  });

  describe('Тестирование селекторов', () => {
    const store = createStore();

    test('Селектор isRequestInProgress должен возвращать состояние запроса', () => {
      const inProgress = store.getState().newOrder.isRequestInProgress;
      expect(inProgress).toBe(false);
    });

    test('Селектор orderDetails должен возвращать данные заказа', () => {
      const orderData = store.getState().newOrder.orderDetails;
      expect(orderData).toEqual(initialOrderData.orderDetails);
    });
  });

  describe('Тестирование экстра-редьюсеров', () => {
    const store = createStore();

    test('Должен обрабатывать состояние pending для createOrder', () => {
      store.dispatch({ type: createOrder.pending.type });
      const state = store.getState();
      expect(state.newOrder.isRequestInProgress).toBe(true);
    });

    test('Должен обрабатывать состояние fulfilled для createOrder', () => {
      store.dispatch({
        type: createOrder.fulfilled.type,
        payload: { order: initialOrderData.orderDetails }
      });
      const state = store.getState();
      expect(state.newOrder.isRequestInProgress).toBe(false);
      expect(state.newOrder.orderDetails).toEqual(
        initialOrderData.orderDetails
      );
    });

    test('Должен обрабатывать состояние rejected для createOrder', () => {
      const errorMessage = 'Ошибка создания заказа';
      store.dispatch({
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      expect(state.newOrder.orderErrorMessage).toBe(errorMessage);
    });
  });

  describe('Тестирование редьюсеров', () => {
    test('Должен сбрасывать состояние заказа', () => {
      const store = createStore();
      store.dispatch(resetOrder());
      const state = store.getState();
      expect(state.newOrder).toEqual(initialNewOrderState);
    });
  });
});
