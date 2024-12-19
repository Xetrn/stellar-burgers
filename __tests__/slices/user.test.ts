import { configureStore } from '@reduxjs/toolkit';
import {
  fetchUser,
  login,
  logout,
  register,
  updateUser,
  userSlice,
  getIsAuthorized,
  getAuthError,
  getAuthLoading,
  getUser
} from '../../src/services/slices';
import {
  error,
  initialUserState,
  userLogoutState,
  userMock,
  userUpdateMock
} from '../../mocks/user';

global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0
};

describe('Слайс пользователя работает', () => {
  it('Конструктор инициализирован правильно', () => {
    const initialState = userSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual(initialState);
  });

  describe('Обработка запроса на регистрацию', () => {
    const store = configureStore({
      reducer: {
        [userSlice.name]: userSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
      Object.defineProperty(global, 'document', {
        value: { cookie: '' },
        writable: true
      });
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = userSlice.reducer(initialUserState, {
        type: register.pending.type
      });
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: {
              name: userMock.name,
              email: userMock.email
            },
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
          })
      });
      await store.dispatch(register(userMock));
      const state = store.getState().user;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.isAuthorized).toBeTruthy();
      expect(state.user).toEqual({
        name: userMock.name,
        email: userMock.email
      });
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));
      await store.dispatch(register(userMock));
      const state = store.getState().user;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Обработка запроса на авторизацию', () => {
    const store = configureStore({
      reducer: {
        [userSlice.name]: userSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
      Object.defineProperty(global, 'document', {
        value: { cookie: '' },
        writable: true
      });
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = userSlice.reducer(initialUserState, {
        type: login.pending.type
      });
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: {
              name: userMock.name,
              email: userMock.email
            },
            accessToken: 'accessToken',
            refreshToken: 'refreshToken'
          })
      });
      await store.dispatch(login(userMock));
      const state = store.getState().user;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.isAuthorized).toBeTruthy();
      expect(state.user).toEqual({
        name: userMock.name,
        email: userMock.email
      });
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));
      await store.dispatch(login(userMock));
      const state = store.getState().user;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Обработка запроса на получение данных пользователя', () => {
    const store = configureStore({
      reducer: {
        [userSlice.name]: userSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
      Object.defineProperty(global, 'document', {
        value: { cookie: 'Bearer accessToken' },
        writable: true
      });
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = userSlice.reducer(initialUserState, {
        type: fetchUser.pending.type
      });
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: {
              name: userMock.name,
              email: userMock.email
            }
          })
      });
      await store.dispatch(fetchUser());
      const state = store.getState().user;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.isAuthorized).toBeTruthy();
      expect(state.user).toEqual({
        name: userMock.name,
        email: userMock.email
      });
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));
      await store.dispatch(fetchUser());
      const state = store.getState().user;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Обработка запроса на обновление данных пользователя', () => {
    const store = configureStore({
      reducer: {
        [userSlice.name]: userSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
      Object.defineProperty(global, 'document', {
        value: { cookie: 'Bearer accessToken' },
        writable: true
      });
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = userSlice.reducer(initialUserState, {
        type: updateUser.pending.type
      });
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: {
              name: userUpdateMock.name,
              email: userUpdateMock.email
            }
          })
      });
      await store.dispatch(updateUser(userUpdateMock));
      const state = store.getState().user;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.isAuthorized).toBeTruthy();
      expect(state.user).toEqual({
        name: userUpdateMock.name,
        email: userUpdateMock.email
      });
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));
      await store.dispatch(updateUser(userUpdateMock));
      const state = store.getState().user;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Обработка запроса на выход из системы', () => {
    const store = configureStore({
      reducer: {
        [userSlice.name]: (state = userLogoutState, action) =>
          userSlice.reducer(state, action)
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
      Object.defineProperty(global, 'document', {
        value: { cookie: 'Bearer accessToken' },
        writable: true
      });
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = userSlice.reducer(userLogoutState, {
        type: logout.pending.type
      });
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true
          })
      });
      await store.dispatch(logout());
      const state = store.getState().user;

      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.isAuthorized).toBeFalsy();
      expect(state.user).toEqual({ name: '', email: '' });
    });
  });

  describe('Селекторы работают корректно', () => {
    const state = {
      [userSlice.name]: {
        ...initialUserState,
        isAuthorized: true,
        user: userMock
      }
    };

    it('Селектор getIsAuthorized работает корректно', () => {
      expect(getIsAuthorized(state)).toBeTruthy();
    });

    it('Селектор getUser работает корректно', () => {
      expect(getUser(state)).toEqual(userMock);
    });

    it('Селектор getAuthError работает корректно', () => {
      expect(getAuthError(state)).toBeNull();
    });

    it('Селектор getAuthLoading работает корректно', () => {
      expect(getAuthLoading(state)).toBeFalsy();
    });
  });
});
