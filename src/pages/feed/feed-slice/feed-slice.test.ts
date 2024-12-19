import Reducer from './feed.slice';
import feedMock from '../../../../cypress/fixtures/feed.json';
import { configureStore } from '@reduxjs/toolkit';
import { getFeed, getUserOrders } from './actions';
import { server } from '../../../../mocs/node';

describe('Тесты на получение ленты заказов', () => {
  let store = configureStore({
    reducer: {
      feedSlice: Reducer
    }
  });

  beforeAll(() => server.listen());
  afterEach(
    () =>
      (store = configureStore({
        reducer: {
          feedSlice: Reducer
        }
      }))
  );
  afterAll(() => server.close());

  test('должен установить isLoading на true при pending', async () => {
    store.dispatch(getFeed.pending('fetchFeed'));

    const { loading, error } = store.getState().feedSlice;

    expect(loading).toBe(true);
    expect(error).toBe(null);
  });

  test('должен сохранить данные и установить isLoading на false при fulfilled', async () => {
    store.dispatch(getFeed.fulfilled(feedMock, 'fetchFeed'));

    const { orders, loading, error } = store.getState().feedSlice;

    expect(loading).toBe(false);
    expect(orders).toEqual(feedMock.orders);
    expect(error).toBe(null);
  });

  test('должен сохранить ошибку и установить isLoading на false при rejected', async () => {
    const errorMock = 'Ошибка при получении ленты заказов';

    store.dispatch(getFeed.rejected(new Error(errorMock), 'fetchFeed'));

    const { loading, error } = store.getState().feedSlice;

    expect(loading).toBe(false);
    expect(error).toBe(errorMock);
  });

  test('загружается лента заказов', async () => {
    const result = await store.dispatch(getFeed());
    expect(result.type).toBe('feed-slice/getAllFeed/fulfilled');

    const { orders } = store.getState().feedSlice;

    expect(orders).toEqual(feedMock.orders);
  });
});

describe('Тесты на получение заказов пользователя', () => {
  let store = configureStore({
    reducer: {
      feedSlice: Reducer
    }
  });

  beforeAll(() => server.listen());
  afterEach(
    () =>
      (store = configureStore({
        reducer: {
          feedSlice: Reducer
        }
      }))
  );
  afterAll(() => server.close());

  test('должен установить isLoading на true при pending', async () => {
    store.dispatch(getUserOrders.pending('fetchUser'));

    const { loadingUser, error } = store.getState().feedSlice;

    expect(loadingUser).toBe(true);
    expect(error).toBe(null);
  });

  test('должен сохранить данные и установить isLoading на false при fulfilled', async () => {
    store.dispatch(getUserOrders.fulfilled(feedMock.orders, 'fetchFeed'));

    const { userOrders, loadingUser, error } = store.getState().feedSlice;

    expect(loadingUser).toBe(false);
    expect(userOrders).toEqual(feedMock.orders);
    expect(error).toBe(null);
  });

  test('должен сохранить ошибку и установить isLoading на false при rejected', async () => {
    const errorMock = 'Ошибка при получении ленты заказов';

    store.dispatch(getUserOrders.rejected(new Error(errorMock), 'fetchFeed'));

    const { loadingUser, error } = store.getState().feedSlice;

    expect(loadingUser).toBe(false);
    expect(error).toBe(errorMock);
  });
  // Проблема в document, если я правильно понимаю, то среда у jest - node, а чтобы работать в dom нужна другая среда
  // а куки берутся в апи бургеров, получается нельзя перехватить запрос к апи
  // test('Загружается лента заказов пользователя', async () => {
  //   const result = await store.dispatch(getUserOrders());
  //
  //   const { userOrders } = store.getState().feedSlice;
  //
  //   expect(userOrders).toEqual(feedMock.orders);
  // });
});
