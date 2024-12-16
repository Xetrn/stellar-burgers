import { expect, test, beforeAll, afterAll } from '@jest/globals';
import {
  initialState,
  getUser,
  userLogout,
  userLogin,
  userSlice,
  userRegister,
  updateUser,
  IUserSlice,
  checkUser
} from '../slices/userSlice';
import { TUserResponse } from '../../utils/burger-api';

// Моковые данные
const mockUserResponse: TUserResponse = {
  success: true,
  user: {
    email: 'ivanivanov@yandex.ru',
    name: 'Ivan'
  }
};

// Сообщения об ошибках
const ERROR_MESSAGES = {
  USER_LOAD_FAILED: 'Не удалось загрузить пользователя',
  USER_UPDATE_FAILED: 'Ошибка обновления пользователя',
  REGISTRATION_FAILED: 'Ошибка регистрации',
  LOGIN_FAILED: 'Ошибка входа',
  LOGOUT_FAILED: 'Ошибка при выходе'
};

describe('Тестирование слайса userSlice', () => {
  beforeAll(() => {
    // Мокаем localStorage
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };
  });

  // Мокаем функции cookie
  jest.mock('../../utils/cookie', () => ({
    setCookie: jest.fn(),
    getCookie: jest.fn(),
    deleteCookie: jest.fn()
  }));

  afterAll(() => {
    // Очищаем все моки
    jest.clearAllMocks();
  });

  // Функция для проверки состояния
  const checkState = (testState: IUserSlice, expectedState: IUserSlice) => {
    expect(testState).toEqual(expectedState);
  };

  describe('Тестирование getUser', () => {
    test('getUser.pending', () => {
      const action = { type: getUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('getUser.fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUserResponse
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserResponse.user,
        isAuthChecked: true
      });
    });

    test('getUser.rejected', () => {
      const action = { type: getUser.rejected.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        error: ERROR_MESSAGES.USER_LOAD_FAILED
      });
    });
  });

  describe('Тестирование checkUser', () => {
    test('checkUser.pending', () => {
      const action = { type: checkUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('checkUser.fulfilled', () => {
      const action = { type: checkUser.fulfilled.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isAuthChecked: true });
    });

    test('checkUser.rejected', () => {
      const action = { type: checkUser.rejected.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: ERROR_MESSAGES.USER_LOAD_FAILED
      });
    });
  });

  describe('Тестирование updateUser', () => {
    test('updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('updateUser.fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUserResponse
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, user: mockUserResponse.user });
    });

    test('updateUser.rejected', () => {
      const action = { type: updateUser.rejected.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        error: ERROR_MESSAGES.USER_UPDATE_FAILED
      });
    });
  });

  describe('Тестирование userRegister', () => {
    test('userRegister.pending', () => {
      const action = { type: userRegister.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('userRegister.fulfilled', () => {
      const action = {
        type: userRegister.fulfilled.type,
        payload: mockUserResponse
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, user: mockUserResponse.user });
    });

    test('userRegister.rejected', () => {
      const action = { type: userRegister.rejected.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        error: ERROR_MESSAGES.REGISTRATION_FAILED
      });
    });
  });

  describe('Тестирование userLogin', () => {
    test('userLogin.pending', () => {
      const action = { type: userLogin.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('userLogin.fulfilled', () => {
      const action = {
        type: userLogin.fulfilled.type,
        payload: mockUserResponse.user
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserResponse.user,
        isAuthChecked: true
      });
    });

    test('userLogin.rejected', () => {
      const action = { type: userLogin.rejected.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: ERROR_MESSAGES.LOGIN_FAILED
      });
    });
  });

  describe('Тестирование userLogout', () => {
    test('userLogout.pending', () => {
      const action = { type: userLogout.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('userLogout.fulfilled', () => {
      const action = { type: userLogout.fulfilled.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: true
      });
    });

    test('userLogout.rejected', () => {
      const action = { type: userLogout.rejected.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: ERROR_MESSAGES.LOGOUT_FAILED
      });
    });
  });
});
