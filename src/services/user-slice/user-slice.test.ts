import Reducer from './user.slice';
import { configureStore } from '@reduxjs/toolkit';
import { registerUser, loginUser, getUser, updateUserData } from './actions';

import userMock from '../../../cypress/fixtures/user.json';
import userRegMock from '../../../cypress/fixtures/userReg.json';
describe('Тесты UserSlice', () => {
  let store = configureStore({
    reducer: {
      userSlice: Reducer
    }
  });

  afterEach(
    () =>
      (store = configureStore({
        reducer: {
          userSlice: Reducer
        }
      }))
  );

  test('обрабатывает registerUser.pending', () => {
    store.dispatch(registerUser.pending('registerUser', userRegMock));
    const state = store.getState().userSlice;

    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.loginUserRequest).toBe(true);
    expect(state.loginUserError).toBe(null);
  });
  // LocalStorage
  // test('обрабатывает registerUser.fulfilled', () => {
  //   const mockPayload = {
  //     user: { email: 'test@example.com', name: 'Test User' },
  //     refreshToken: 'mockRefreshToken',
  //     accessToken: 'mockAccessToken'
  //   };
  //   store.dispatch(
  //     registerUser.fulfilled(userFullMock, 'registerUser', userRegMock)
  //   );
  //   const state = store.getState().userSlice;
  //
  //   expect(state.data).toEqual(mockPayload.user);
  //   expect(state.isAuthenticated).toBe(true);
  //   expect(state.isAuthChecked).toBe(true);
  //   expect(state.loginUserRequest).toBe(false);
  // });

  test('обрабатывает registerUser.rejected', () => {
    const errorMessage = 'Ошибка регистрации';
    store.dispatch(
      registerUser.rejected(
        new Error(errorMessage),
        'registerUser',
        userRegMock
      )
    );
    const state = store.getState().userSlice;

    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserRequest).toBe(false);
    expect(state.loginUserError).toBe(errorMessage);
  });

  test('обрабатывает loginUser.pending', () => {
    store.dispatch(loginUser.pending('loginUser', userRegMock));
    const state = store.getState().userSlice;

    expect(state.loginUserRequest).toBe(true);
    expect(state.loginUserError).toBe(null);
  });
  // LocalStorage
  // test('обрабатывает loginUser.fulfilled', () => {
  //   const mockPayload = {
  //     user: { email: 'test@example.com', name: 'Test User' },
  //     refreshToken: 'mockRefreshToken',
  //     accessToken: 'mockAccessToken'
  //   };
  //   store.dispatch(loginUser.fulfilled(userFullMock, 'loginUser', userRegMock));
  //   const state = store.getState().userSlice;
  //
  //   expect(state.data).toEqual(mockPayload.user);
  //   expect(state.isAuthenticated).toBe(true);
  //   expect(state.isAuthChecked).toBe(true);
  //   expect(state.loginUserRequest).toBe(false);
  // });

  test('обрабатывает loginUser.rejected', () => {
    const errorMessage = 'Ошибка авторизации';
    store.dispatch(
      loginUser.rejected(new Error(errorMessage), 'loginUser', userRegMock)
    );
    const state = store.getState().userSlice;

    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBe(errorMessage);
  });

  test('обрабатывает getUser.fulfilled', () => {
    const mockPayload = {
      user: { email: 'test@example.com', name: 'Test User' }
    };
    store.dispatch(getUser.fulfilled(userMock, 'getUser'));
    const state = store.getState().userSlice;

    expect(state.data).toEqual(userMock.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserRequest).toBe(false);
  });

  test('обрабатывает getUser.pending', () => {
    store.dispatch(getUser.pending('getUser'));
    const state = store.getState().userSlice;

    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.loginUserRequest).toBe(true);
  });

  test('обрабатывает getUser.rejected', () => {
    store.dispatch(
      getUser.rejected(new Error('Ошибка получения пользователя'), 'getUser')
    );
    const state = store.getState().userSlice;

    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.loginUserRequest).toBe(true);
  });

  test('обрабатывает updateUserData.fulfilled', () => {
    const mockPayload = {
      success: true,
      user: {
        email: 'new',
        name: 'new'
      }
    };

    store.dispatch(
      updateUserData.fulfilled(mockPayload, 'updateUserData', {
        email: 'test@yandex.ru',
        name: 'test',
        password: '1'
      })
    );
    const state = store.getState().userSlice;
    expect(state.loginUserRequest).toBe(false);
  });
  test('обрабатывает updateUserData.pending', () => {
    store.dispatch(
      updateUserData.pending('updateUserData', {
        email: 'test@yandex.ru',
        name: 'test',
        password: '1'
      })
    );
    const state = store.getState().userSlice;
    expect(state.loginUserRequest).toBe(true);
  });
  test('обрабатывает updateUserData.rejected', () => {
    store.dispatch(
      updateUserData.rejected(
        new Error('Ошибка изменения данных'),
        'updateUserData',
        {}
      )
    );
    const state = store.getState().userSlice;
    expect(state.loginUserRequest).toBe(false);
  });
  // LocalStorage
  // test('обрабатывает logout.fulfilled', () => {
  //   store.dispatch(logout.fulfilled(userFullMock, 'logout'));
  //   const state = store.getState().userSlice;
  //
  //   expect(state.data).toEqual({ email: '', name: '' });
  //   expect(state.isAuthenticated).toBe(false);
  //   expect(state.isAuthChecked).toBe(true);
  // });
});
