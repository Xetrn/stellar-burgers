import { configureStore } from '@reduxjs/toolkit';
import ordersReducer, {
  IOrdersState,
  initialState,
  createOrder,
  fetchOrders,
  fetchOrderByNumber,
  fetchFeeds,
  clearOrder,
  getOrder,
  getLoading,
  getOrders,
  getTotal,
  getTotalToday,
  ordersSlice
} from './ordersSlice';

// Моковые данные
const mockedOrderData: IOrdersState = {
  order: {
    _id: '66fad4f207d06e001c3719c3',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    number: 54710,
    status: 'done',
    createdAt: '2024-09-30T16:42:26.241Z',
    updatedAt: '2024-09-30T16:42:27.058Z',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941']
  },
  orders: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      number: 12345,
      status: 'pending',
      createdAt: '2024-09-29T16:00:00.000Z',
      updatedAt: '2024-09-29T17:00:00.000Z',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941']
    }
  ],
  feedOrders: [],
  total: 1,
  totalToday: 1,
  loading: false,
  error: null
};

const testStore = () =>
  configureStore({
    reducer: {
      orders: ordersReducer
    },
    preloadedState: {
      orders: mockedOrderData
    }
  });

describe('ordersSlice', () => {
  describe('initialState', () => {
    test('должен вернуть initialState при неизвестном действии', () => {
      const state = ordersReducer(undefined, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
    });
  });

  describe('selectors', () => {
    const store = testStore();

    test('getOrder', () => {
      const order = getOrder(store.getState());
      expect(order).toEqual(mockedOrderData.order);
    });

    test('getLoading', () => {
      const loading = getLoading(store.getState());
      expect(loading).toBe(false);
    });

    test('getOrders', () => {
      const orders = getOrders(store.getState());
      expect(orders).toEqual(mockedOrderData.orders);
    });

    test('getTotal', () => {
      const total = getTotal(store.getState());
      expect(total).toBe(1);
    });

    test('getTotalToday', () => {
      const totalToday = getTotalToday(store.getState());
      expect(totalToday).toBe(1);
    });
  });

  describe('extraReducers', () => {
    const store = testStore();

    test('createOrder fulfilled', () => {
      const newOrder = {
        order: mockedOrderData.order
      };
      store.dispatch({
        type: createOrder.fulfilled.type,
        payload: newOrder
      });
      const state = store.getState().orders;
      expect(state.order).toEqual(mockedOrderData.order);
      expect(state.loading).toBe(false);
    });

    test('createOrder pending', () => {
      store.dispatch({ type: createOrder.pending.type });
      const state = store.getState().orders;
      expect(state.loading).toBe(true);
    });

    test('createOrder rejected', () => {
      const errorMessage = 'Ошибка создания заказа';
      store.dispatch({
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState().orders;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    test('fetchFeeds fulfilled', () => {
      const feedData = {
        orders: mockedOrderData.orders,
        total: 100,
        totalToday: 50
      };
      store.dispatch({
        type: fetchFeeds.fulfilled.type,
        payload: feedData
      });
      const state = store.getState().orders;
      expect(state.feedOrders).toEqual(feedData.orders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(50);
    });
  });

  describe('reducers', () => {
    test('clearOrder', () => {
      const store = testStore();
      store.dispatch(clearOrder());
      const state = store.getState().orders;
      expect(state.order).toBe(null);
    });
  });
});
