import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  userSlice,
  fetchUser,
  logout,
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  updateUser
} from '../src/services/userSlice';
import {
  mockLoginData,
  mockRegisterData,
  mockUserResponse,
  mockAuthResponse,
  mockUser,
  mockForgotPasswordData,
  mockResetPasswordData,
  requestId,
  errorMessage
} from './mocks';

describe('Тесты проверяющие работу userReducer', () => {
  test('Проверка начального состояния', () => {
    const state = userSlice.reducer(undefined, { type: 'unknown' });
    expect(state).toStrictEqual(initialState);
  });

  describe('Тестирование асинхронного экшена: fetchUser', () => {
    test('Обработка состояния загрузки', () => {
      const action = fetchUser.pending(requestId);
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBeNull();
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
    });

    test('Обработка успешного запроса', () => {
      const action = fetchUser.fulfilled(mockUserResponse, requestId);
      const state = userSlice.reducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toStrictEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    test('Обработка ошибки запроса', () => {
      const action = fetchUser.rejected(new Error(errorMessage), requestId);
      const state = userSlice.reducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe(errorMessage);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('Тестирование асинхронного экшена: logout', () => {
    test('Обработка успешного запроса', () => {
      const action = logout.fulfilled(undefined, requestId);
      const state = userSlice.reducer(initialState, action);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('Тестирование асинхронного экшена: loginUser', () => {
    test('Обработка состояния загрузки', () => {
      const action = loginUser.pending(requestId, mockLoginData);
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    test('Обработка успешного запроса', () => {
      const action = loginUser.fulfilled(
        mockAuthResponse,
        requestId,
        mockLoginData
      );
      const state = userSlice.reducer(initialState, action);
      expect(state.user).toStrictEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    test('Обработка ошибки запроса', () => {
      const action = loginUser.rejected(
        new Error(errorMessage),
        requestId,
        mockLoginData
      );
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBe(errorMessage);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe('Тестирование асинхронного экшена: registerUser', () => {
    test('Обработка состояния загрузки', () => {
      const action = registerUser.pending(requestId, mockRegisterData);
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    test('Обработка успешного запроса', () => {
      const action = registerUser.fulfilled(
        mockAuthResponse,
        requestId,
        mockRegisterData
      );
      const state = userSlice.reducer(initialState, action);
      expect(state.user).toStrictEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    test('Обработка ошибки запроса', () => {
      const action = registerUser.rejected(
        new Error(errorMessage),
        requestId,
        mockRegisterData
      );
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Тестирование асинхронного экшена: updateUser', () => {
    test('Обработка состояния загрузки', () => {
      const action = updateUser.pending(requestId, mockRegisterData);
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBeNull();
    });

    test('Обработка успешного запроса', () => {
      const action = updateUser.fulfilled(
        mockAuthResponse,
        requestId,
        mockRegisterData
      );
      const state = userSlice.reducer(initialState, action);
      expect(state.user).toStrictEqual(mockUser);
    });

    test('Обработка ошибки запроса', () => {
      const action = updateUser.rejected(
        new Error(errorMessage),
        requestId,
        mockRegisterData
      );
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Тестирование асинхронного экшена: forgotPassword', () => {
    test('Обработка состояния загрузки', () => {
      const action = forgotPassword.pending(requestId, mockForgotPasswordData);
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBeNull();
    });

    test('Обработка ошибки запроса', () => {
      const action = forgotPassword.rejected(
        new Error(errorMessage),
        requestId,
        mockForgotPasswordData
      );
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Тестирование асинхронного экшена: resetPassword', () => {
    test('Обработка состояния загрузки', () => {
      const action = resetPassword.pending(requestId, mockResetPasswordData);
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBeNull();
    });

    test('Обработка ошибки запроса', () => {
      const action = resetPassword.rejected(
        new Error(errorMessage),
        requestId,
        mockResetPasswordData
      );
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBe(errorMessage);
    });
  });
});
