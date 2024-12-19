import Reducer from './order-modal.slice';
import orderMock from '../../../../cypress/fixtures/getOrder.json';
import { configureStore } from '@reduxjs/toolkit';
import { server } from '../../../../mocs/node';
import { getOrderById } from './getFeedById';

describe('Тесты на получение информации о заказе', () => {
  let store = configureStore({
    reducer: {
      orderModalSlice: Reducer
    }
  });

  beforeAll(() => server.listen());
  afterEach(
    () =>
      (store = configureStore({
        reducer: {
          orderModalSlice: Reducer
        }
      }))
  );
  afterAll(() => server.close());

  test('должен установить isLoading на true при pending', async () => {
    store.dispatch(getOrderById.pending('fetchOrder', 0));

    const { loading, error } = store.getState().orderModalSlice;

    expect(loading).toBe(true);
    expect(error).toBe(null);
  });

  test('должен сохранить данные и установить isLoading на false при fulfilled', async () => {
    store.dispatch(getOrderById.fulfilled(orderMock, 'fetchFeed', 0));

    const { order, loading, error } = store.getState().orderModalSlice;

    expect(loading).toBe(false);
    expect(order).toEqual(orderMock.orders[0]);
    expect(error).toBe(null);
  });

  test('должен сохранить ошибку и установить isLoading на false при rejected', async () => {
    const errorMock = 'Ошибка при получении ленты заказов';

    store.dispatch(getOrderById.rejected(new Error(errorMock), 'fetchFeed', 0));

    const { loading, error } = store.getState().orderModalSlice;

    expect(loading).toBe(false);
    expect(error).toBe(errorMock);
  });

  test('загружается информация о заказе', async () => {
    const result = await store.dispatch(getOrderById(0));
    expect(result.type).toBe('orderModalSlice/getSingleOrder/fulfilled');

    const { order } = store.getState().orderModalSlice;

    expect(order).toEqual(orderMock.orders[0]);
  });
});
