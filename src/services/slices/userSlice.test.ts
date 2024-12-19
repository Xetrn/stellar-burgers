import { expect, test, beforeAll, afterAll } from '@jest/globals';
import {
  register,
  login,
  updateUser,
  apiGetUser,
  userSlice,
  logout
} from '../slices/userSlice';
import { TUser } from '@utils-types';
import { TUserState } from '../slices/userSlice';

const mockUserData: TUser = {
  email: 'testuser@yandex.ru',
  name: 'Test User'
};

const mockErrorResponse = {
  message: 'Error message'
};

const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
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

  afterAll(() => {
    jest.clearAllMocks();
  });

  const checkState = (testState: TUserState, expectedState: TUserState) => {
    expect(testState).toEqual(expectedState);
  };

  describe('Тестирование register', () => {
    test('register.pending', () => {
      const action = { type: register.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, error: '' });
    });

    test('register.fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: { user: mockUserData }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserData,
        isAuthChecked: true,
        error: ''
      });
    });

    test('register.rejected', () => {
      const action = {
        type: register.rejected.type,
        error: { message: mockErrorResponse.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        error: mockErrorResponse.message
      });
    });
  });

  describe('Тестирование login', () => {
    test('login.pending', () => {
      const action = { type: login.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, error: '' });
    });

    test('login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: mockUserData }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserData,
        isAuthChecked: true,
        error: ''
      });
    });

    test('login.rejected', () => {
      const action = {
        type: login.rejected.type,
        error: { message: mockErrorResponse.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: mockErrorResponse.message
      });
    });
  });

  describe('Тестирование apiGetUser', () => {
    test('apiGetUser.pending', () => {
      const action = { type: apiGetUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, error: '' });
    });

    test('apiGetUser.fulfilled', () => {
      const action = {
        type: apiGetUser.fulfilled.type,
        payload: { user: mockUserData }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserData,
        isAuthChecked: true,
        error: ''
      });
    });

    test('apiGetUser.rejected', () => {
      const action = {
        type: apiGetUser.rejected.type,
        error: { message: mockErrorResponse.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: mockErrorResponse.message
      });
    });
  });

  describe('Тестирование updateUser', () => {
    test('updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, error: '' });
    });

    test('updateUser.fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: mockUserData }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserData,
        isAuthChecked: true,
        error: ''
      });
    });

    test('updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: mockErrorResponse.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: mockErrorResponse.message
      });
    });
  });

  describe('Тестирование logout', () => {
    test('logout.fulfilled', () => {
      const action = { type: logout.fulfilled.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        isAuthChecked: false,
        user: { email: '', name: '' },
        error: ''
      });
    });
  });
});
