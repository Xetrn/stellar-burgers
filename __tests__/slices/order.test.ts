import { configureStore } from '@reduxjs/toolkit';
import {
  createNewOrder,
  fetchOrder,
  newOrderSlice,
  getOrderModalData,
  getOrderRequest,
  getOrderError
} from '../../src/services/slices';
import {
  error,
  initialOrderState,
  modalOrderMock,
  orderCreatedResponseMock,
  orderFetchedResponseMock,
  orderMock
} from '../../mocks/order';

describe('Слайс нового заказа работает', () => {
  it('Конструктор инициализирован правильно', () => {
    const initialState = newOrderSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual(initialOrderState);
  });

  describe('Обработка запроса создания заказа', () => {
    const store = configureStore({
      reducer: {
        [newOrderSlice.name]: newOrderSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
      Object.defineProperty(global, 'document', {
        value: {
          cookie: 'Bearer accessToken'
        },
        writable: true
      });
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = newOrderSlice.reducer(initialOrderState, {
        type: createNewOrder.pending.type
      });
      expect(state.orderRequest).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(orderCreatedResponseMock)
      });
      await store.dispatch(createNewOrder(orderMock));
      const state = store.getState().order;
      expect(state.orderRequest).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orderModalData).toEqual(modalOrderMock);
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));
      await store.dispatch(createNewOrder(orderMock));
      const state = store.getState().order;
      expect(state.orderRequest).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Обработка запроса получения заказа', () => {
    const store = configureStore({
      reducer: {
        [newOrderSlice.name]: newOrderSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = newOrderSlice.reducer(initialOrderState, {
        type: fetchOrder.pending.type
      });
      expect(state.orderRequest).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(orderFetchedResponseMock)
      });
      await store.dispatch(fetchOrder(62639));
      const state = store.getState().order;
      expect(state.orderRequest).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.orderModalData).toEqual(modalOrderMock);
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));
      await store.dispatch(fetchOrder(62639));
      const state = store.getState().order;
      expect(state.orderRequest).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Селекторы работают корректно', () => {
    const state = {
      [newOrderSlice.name]: {
        orderModalData: modalOrderMock,
        orderRequest: false,
        error: null
      }
    };

    it('Селектор getOrderModalData работает корректно', () => {
      expect(getOrderModalData(state)).toEqual(modalOrderMock);
    });

    it('Селектор getOrderRequest работает корректно', () => {
      expect(getOrderRequest(state)).toBeFalsy();
    });

    it('Селектор getOrderError работает корректно', () => {
      expect(getOrderError(state)).toBeNull();
    });
  });
});
