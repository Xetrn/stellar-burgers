import reducer, {
  initialState,
  setAuthChecked,
  setUser,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  logoutUser
} from './authSlice';
import * as api from '@api'; // Импортируем все API функции

jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  forgotPasswordApi: jest.fn(),
  resetPasswordApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  getCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

describe('authSlice', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Сбрасываем моки после каждого теста
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle setAuthChecked', () => {
    const state = reducer(initialState, setAuthChecked(true));
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle setUser', () => {
    const mockUser = { name: 'John Doe', email: 'john.doe@example.com' };
    const state = reducer(initialState, setUser(mockUser));
    expect(state.user).toEqual(mockUser);
  });

  describe('Async thunks', () => {
    const mockUser = {
      user: { name: 'John Doe', email: 'john.doe@example.com' },
      accessToken: 'mockToken',
      refreshToken: 'mockRefreshToken'
    };

    it('registerUser should handle fulfilled state', async () => {
      // Приведение типа для использования mockResolvedValueOnce
      (api.registerUserApi as jest.Mock).mockResolvedValueOnce(mockUser);

      const action = registerUser({
        name: 'John',
        email: 'test@example.com',
        password: 'password'
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: registerUser.pending.type })
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: registerUser.fulfilled.type,
          payload: mockUser
        })
      );
      expect(api.registerUserApi).toHaveBeenCalledTimes(1);
    });

    it('registerUser should handle rejected state', async () => {
      const mockError = 'Registration failed';
      (api.registerUserApi as jest.Mock).mockRejectedValueOnce(mockError);

      const action = registerUser({
        name: 'John',
        email: 'test@example.com',
        password: 'password'
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: registerUser.pending.type })
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: registerUser.rejected.type,
          error: expect.anything()
        })
      );
      expect(api.registerUserApi).toHaveBeenCalledTimes(1);
    });

    it('loginUser should handle fulfilled state', async () => {
      (api.loginUserApi as jest.Mock).mockResolvedValueOnce(mockUser);

      const action = loginUser({
        email: 'test@example.com',
        password: 'password'
      });
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: loginUser.pending.type })
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: loginUser.fulfilled.type,
          payload: mockUser
        })
      );
      expect(api.loginUserApi).toHaveBeenCalledTimes(1);
    });

    it('forgotPassword should handle fulfilled state', async () => {
      const mockResponse = { success: true };
      (api.forgotPasswordApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      const action = forgotPassword({ email: 'test@example.com' });
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: forgotPassword.pending.type })
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: forgotPassword.fulfilled.type,
          payload: mockResponse
        })
      );
      expect(api.forgotPasswordApi).toHaveBeenCalledTimes(1);
    });

    it('logoutUser should handle fulfilled state', async () => {
      const mockResponse = { success: true };
      (api.logoutApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      const action = logoutUser();
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: logoutUser.pending.type })
      );
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: logoutUser.fulfilled.type,
          payload: undefined
        })
      );
      expect(api.logoutApi).toHaveBeenCalledTimes(1);
    });
  });
});
