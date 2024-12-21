import { configureStore } from '@reduxjs/toolkit';
import {
  TUserState,
  selectAuthError,
  selectUserName,
  selectUser,
  selectAuthStatus,
  logOutUser,
  registerUser,
  updateUser,
  apiGetUser,
  userSlice
} from './userSlice';

const createStore = () =>
  configureStore({
    reducer: {
      user: userSlice.reducer
    }
  });

const mockUserData: TUserState = {
  isAuthVerified: false,
  user: {
    name: 'test',
    email: 'test@test.com'
  },
  error: undefined
};

describe('Тесты слайса пользователя', () => {
  describe('Авторизация', () => {
    const store = createStore();

    test('Обработка состояния pending при авторизации', () => {
      store.dispatch({ type: apiGetUser.pending.type });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(false);
      expect(state.user.error).toBe('');
    });

    test('Обработка состояния fulfilled при авторизации', () => {
      store.dispatch({
        type: apiGetUser.fulfilled.type,
        payload: mockUserData
      });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(true);
      expect(state.user.user).toBe(mockUserData.user);
      expect(state.user.error).toBe('');
    });

    test('Обработка состояния rejected при авторизации', () => {
      const errorMessage = 'Ошибка авторизации';
      store.dispatch({
        type: apiGetUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(false);
      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('Регистрация', () => {
    const store = createStore();

    test('Обработка состояния fulfilled при регистрации', () => {
      store.dispatch({
        type: registerUser.fulfilled.type,
        payload: mockUserData
      });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(true);
      expect(state.user.user).toBe(mockUserData.user);
      expect(state.user.error).toBe('');
    });

    test('Обработка состояния pending при регистрации', () => {
      store.dispatch({ type: registerUser.pending.type });
      const state = store.getState();

      expect(state.user.error).toBe('');
    });

    test('Обработка состояния rejected при регистрации', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('Выход пользователя', () => {
    const store = createStore();

    test('Обработка состояния fulfilled при выходе', () => {
      store.dispatch({
        type: logOutUser.fulfilled.type,
        payload: mockUserData
      });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(false);
      expect(state.user.user).toEqual({ email: '', name: '' });
    });
  });

  describe('Обновление данных пользователя', () => {
    const store = createStore();

    test('Обработка состояния fulfilled при обновлении', () => {
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'test', email: mockUserData.user.email } }
      });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(true);
      expect(state.user.user).toEqual({
        name: 'test',
        email: mockUserData.user.email
      });
    });

    test('Обработка состояния pending при обновлении', () => {
      store.dispatch({ type: updateUser.pending.type });
      const state = store.getState();

      expect(state.user.error).toBe('');
    });

    test('Обработка состояния rejected при обновлении', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('Проверка селекторов', () => {
    const store = createStore();
    const state = store.getState();

    test('Проверка селектора состояния авторизации', () => {
      const isAuthChecked = selectAuthStatus(state);

      expect(isAuthChecked).toBe(false);
    });

    test('Проверка селектора получения данных пользователя', () => {
      const getUser = selectUser(state);

      expect(getUser).toBe(state.user.user);
    });

    test('Проверка селектора получения имени пользователя', () => {
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'test', email: mockUserData.user.email } }
      });
      const state = store.getState();
      const getName = selectUserName(state);

      expect(getName).toBe(state.user.user.name);
    });

    test('Проверка селектора получения ошибки авторизации', () => {
      const errorMessage = 'Ошибка при обновлении';
      store.dispatch({
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      const getError = selectAuthError(state);

      expect(getError).toEqual(errorMessage);
    });
  });
});
