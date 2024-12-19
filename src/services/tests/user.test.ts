import { afterAll, beforeAll, expect, test } from '@jest/globals';
import {
  getUserRequest,
  initialState,
  login,
  logout,
  register,
  TUserState,
  updateUser,
  userSlice
} from '../slices/user';
import { TUserResponse } from '../../utils/burger-api';

const mockUserResponse: TUserResponse = {
  success: true,
  user: {
    email: 'test@mail.ru',
    name: 'TestUser'
  }
};

const ERROR_MESSAGES = {
  USER_LOAD_FAILED: 'Не удалось загрузить пользователя',
  USER_UPDATE_FAILED: 'Ошибка обновления пользователя',
  REGISTRATION_FAILED: 'Ошибка регистрации',
  LOGIN_FAILED: 'Ошибка входа',
  LOGOUT_FAILED: 'Ошибка при выходе'
};

describe('Check user api', () => {
  beforeAll(() => {
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };
  });

  jest.mock('../../utils/cookie', () => ({
    setCookie: jest.fn(),
    getCookie: jest.fn(),
    deleteCookie: jest.fn()
  }));

  afterAll(() => {
    jest.clearAllMocks();
  });

  const checkState = (testState: TUserState, expectedState: TUserState) => {
    expect(testState).toEqual(expectedState);
  };

  describe('Check get user', () => {
    test('getUserRequest.pending', () => {
      const action = { type: getUserRequest.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('getUserRequest.fulfilled', () => {
      const action = {
        type: getUserRequest.fulfilled.type,
        payload: mockUserResponse
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserResponse.user,
        isLoading: false,
        isAuth: true
      });
    });

    test('getUserRequest.rejected', () => {
      const action = {
        type: getUserRequest.rejected.type,
        error: { message: ERROR_MESSAGES.USER_LOAD_FAILED }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isLoading: false,
        error: ERROR_MESSAGES.USER_LOAD_FAILED
      });
    });
  });

  describe('Check update user', () => {
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
      checkState(newState, {
        ...initialState,
        user: mockUserResponse.user,
        isAuth: true
      });
    });

    test('updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: ERROR_MESSAGES.USER_UPDATE_FAILED }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isLoading: false,
        error: ERROR_MESSAGES.USER_UPDATE_FAILED
      });
    });
  });

  describe('Check register', () => {
    test('register.pending', () => {
      const action = { type: register.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('register.fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: mockUserResponse
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserResponse.user,
        isAuth: true,
        isLoading: false
      });
    });

    test('register.rejected', () => {
      const action = {
        type: register.rejected.type,
        error: { message: ERROR_MESSAGES.REGISTRATION_FAILED }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isLoading: false,
        error: ERROR_MESSAGES.REGISTRATION_FAILED
      });
    });
  });

  describe('Check login', () => {
    test('login.pending', () => {
      const action = { type: login.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isLoading: true });
    });

    test('login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: mockUserResponse.user }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserResponse.user,
        isAuth: true,
        isLoading: false
      });
    });

    test('login.rejected', () => {
      const action = {
        type: login.rejected.type,
        error: { message: ERROR_MESSAGES.LOGIN_FAILED }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuth: false,
        isLoading: false,
        error: ERROR_MESSAGES.LOGIN_FAILED
      });
    });
  });

  describe('Check logout', () => {
    test('logout.fulfilled', () => {
      const action = { type: logout.fulfilled.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuth: false
      });
    });
  });
});

describe('Check user selectors', () => {
  const state = {
    user: {
      isAuth: true,
      user: { email: 'test@test.com', name: 'Test User' },
      error: 'Ошибка',
      isLoading: false
    }
  };

  test('isAuth', () => {
    expect(userSlice.selectors.isAuth(state)).toBe(true);
  });

  test('getUser', () => {
    expect(userSlice.selectors.getUser(state)).toEqual({
      email: 'test@test.com',
      name: 'Test User'
    });
  });

  test('getName', () => {
    expect(userSlice.selectors.getName(state)).toBe('Test User');
  });

  test('getUserError', () => {
    expect(userSlice.selectors.getUserError(state)).toBe('Ошибка');
  });

  test('isLoadingAuth', () => {
    expect(userSlice.selectors.isLoadingAuth(state)).toBe(false);
  });
});
