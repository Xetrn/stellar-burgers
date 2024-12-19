import { expect, test, beforeAll, afterAll } from '@jest/globals';
import {
  registerUser,
  loginUser,
  updateUser,
  checkUserAuth,
  userSlice,
  clearUserData
} from '../slices/userSlice';
import { TUser } from '../../utils/types';
import { TUserState } from '../slices/userSlice';

const mockUserData: TUser = {
  email: 'testuser@yandex.ru',
  name: 'Test User'
};

const mockErrorResponse = {
  message: 'Error message',
  success: false
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  registerUserError: null,
  registerUserRequest: false,
  loginUserError: null,
  loginUserRequest: false
};

describe('Тестирование слайса userSlice', () => {
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

  describe('Тестирование registerUser', () => {
    test('registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, registerUserRequest: true });
    });

    test('registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUserData
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        data: mockUserData,
        isAuthenticated: true,
        isAuthChecked: true,
        registerUserRequest: false
      });
    });

    test('registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        payload: mockErrorResponse
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        registerUserRequest: false,
        registerUserError: mockErrorResponse
      });
    });
  });

  describe('Тестирование loginUser', () => {
    test('loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, loginUserRequest: true });
    });

    test('loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUserData
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        data: mockUserData,
        isAuthenticated: true,
        isAuthChecked: true,
        loginUserRequest: false
      });
    });

    test('loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        payload: mockErrorResponse
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        loginUserRequest: false,
        loginUserError: mockErrorResponse
      });
    });
  });

  describe('Тестирование checkUserAuth', () => {
    test('checkUserAuth.pending', () => {
      const action = { type: checkUserAuth.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, isAuthChecked: false });
    });

    test('checkUserAuth.fulfilled', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: mockUserData
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        data: mockUserData,
        isAuthenticated: true,
        isAuthChecked: true
      });
    });

    test('checkUserAuth.rejected', () => {
      const action = { type: checkUserAuth.rejected.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: false,
        data: null
      });
    });
  });

  describe('Тестирование updateUser', () => {
    test('updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, loginUserRequest: true });
    });

    test('updateUser.fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUserData
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, data: mockUserData, loginUserRequest: false });
    });

    test('updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        payload: mockErrorResponse
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        loginUserRequest: false,
        loginUserError: mockErrorResponse
      });
    });
  });
  
  describe('Тестирование clearUserData', () => {
    test('clearUserData должен сбрасывать состояние пользователя', () => {
      const initialStateWithUser = {
        isAuthChecked: true,
        isAuthenticated: true,
        data: { email: 'ivanivanov@yandex.ru', name: 'Ivan' },
        registerUserError: null,
        registerUserRequest: false,
        loginUserError: null,
        loginUserRequest: false
      };

      const action = { type: clearUserData.type };

      const newState = userSlice.reducer(initialStateWithUser, action);

      expect(newState).toEqual({
        isAuthChecked: false,
        isAuthenticated: false,
        data: null,
        registerUserError: null,
        registerUserRequest: false,
        loginUserError: null,
        loginUserRequest: false
      });
    });
  });
});
