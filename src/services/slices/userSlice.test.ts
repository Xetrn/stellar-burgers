import { configureStore } from '@reduxjs/toolkit';
import {
  apiGetUser,
  getErrorSelector,
  getNameSelector,
  getUserSelector,
  isAuthCheckedSelector,
  logout,
  registerFetch,
  TUserState,
  updateUser,
  userReducer
} from './userSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

const mockedUserData: TUserState = {
  isAuthVerified: false,
  user: {
    name: 'test',
    email: 'test@test.com'
  },
  error: undefined
};

describe('user slice', () => {
  describe('login', () => {
    const store = createTestStore();

    test('handle login pending state', () => {
      store.dispatch({ type: apiGetUser.pending.type });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(false);
      expect(state.user.error).toBe('');
    });

    test('handle login fulfilled state', () => {
      store.dispatch({ type: apiGetUser.fulfilled.type, payload: mockedUserData });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(true);
      expect(state.user.user).toBe(mockedUserData.user);
      expect(state.user.error).toBe('');
    });

    test('handle login rejected state', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: apiGetUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(false);
      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('register', () => {
    const store = createTestStore();

    test('handle register fulfilled state', () => {
      store.dispatch({ type: registerFetch.fulfilled.type, payload: mockedUserData });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(true);
      expect(state.user.user).toBe(mockedUserData.user);
      expect(state.user.error).toBe('');
    });

    test('handle register pending state', () => {
      store.dispatch({ type: registerFetch.pending.type });
      const state = store.getState();

      expect(state.user.error).toBe('');
    });

    test('handle register rejected state', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: registerFetch.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('logout', () => {
    const store = createTestStore();

    test('handle logout fulfilled state', () => {
      store.dispatch({ type: logout.fulfilled.type, payload: mockedUserData });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(false);
      expect(state.user.user).toEqual({ email: '', name: '' });
    });
  });

  describe('update user', () => {
    const store = createTestStore();

    test('handle update fulfilled state', () => {
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'test', email: mockedUserData.user.email } }
      });
      const state = store.getState();

      expect(state.user.isAuthVerified).toBe(true);
      expect(state.user.user).toEqual({
        name: 'test',
        email: mockedUserData.user.email
      });
    });

    test('handle update pending state', () => {
      store.dispatch({ type: updateUser.pending.type });
      const state = store.getState();

      expect(state.user.error).toBe('');
    });

    test('handle update rejected state', () => {
      const errorMessage = 'rejected message';
      store.dispatch({
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();

      expect(state.user.error).toBe(errorMessage);
    });
  });

  describe('selectors', () => {
    const store = createTestStore();
    const state = store.getState();

    test('isAuthCheckedSelector', () => {
      const isAuthChecked = isAuthCheckedSelector(state);

      expect(isAuthChecked).toBe(false);
    });

    test('getUserSelector should select user data', () => {
      const getUser = getUserSelector(state);

      expect(getUser).toBe(state.user.user);
    });

    test('getNameSelector should select user name', () => {
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'test', email: mockedUserData.user.email } }
      });
      const state = store.getState();
      const getName = getNameSelector(state);

      expect(getName).toBe(state.user.user.name);
    });

    test('getErrorSelector should select error message', () => {
      const errorMessage = 'error message';
      store.dispatch({
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState();
      const getError = getErrorSelector(state);

      expect(getError).toEqual(errorMessage);
    });
  });
});
