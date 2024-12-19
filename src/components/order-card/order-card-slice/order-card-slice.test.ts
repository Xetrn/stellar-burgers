import Reducer from './order-card.slice';
import orderMockResponse from '../../../../cypress/fixtures/postOrderResponse.json';

import { configureStore } from '@reduxjs/toolkit';
import { server } from '../../../../mocs/node';
import { postOrder } from './postOrder';

describe('Тесты на получение информации о заказе', () => {
  let store = configureStore({
    reducer: {
      orderCardSlice: Reducer
    }
  });

  beforeAll(() => server.listen());
  afterEach(
    () =>
      (store = configureStore({
        reducer: {
          orderCardSlice: Reducer
        }
      }))
  );
  afterAll(() => server.close());

  test('должен установить isLoading на true при pending', async () => {
    store.dispatch(postOrder.pending('postOrder', []));
    const { loading, error } = store.getState().orderCardSlice;

    expect(loading).toBe(true);
    expect(error).toBe(null);
  });

  test('должен сохранить данные и установить isLoading на false при fulfilled', async () => {
    store.dispatch(postOrder.fulfilled(orderMockResponse, 'fetchFeed', ['0']));

    const { loading, error, orderModalData } = store.getState().orderCardSlice;

    expect(loading).toBe(false);
    expect(orderModalData).toEqual(orderMockResponse.order);
    expect(error).toBe(null);
  });

  test('должен сохранить ошибку и установить isLoading на false при rejected', async () => {
    const errorMock = 'Ошибка при получении ленты заказов';

    store.dispatch(postOrder.rejected(new Error(errorMock), 'fetchFeed', []));

    const { loading, error } = store.getState().orderCardSlice;

    expect(loading).toBe(false);
    expect(error).toBe(errorMock);
  });

  // test('загружается информация о заказе', async () => {
  //   const result = await store.dispatch(postOrder(['0']));
  //   expect(result.type).toBe('order-card-slice/post-order/fulfilled');
  //
  //   const { orderModalData } = store.getState().orderCardSlice;
  //
  //   expect(orderModalData).toEqual(orderMockResponse.order);
  // });
});
