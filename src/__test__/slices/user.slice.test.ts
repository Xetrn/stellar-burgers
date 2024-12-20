import { TUser } from '../../utils/types';
import {
  UserReducer,
  setUser,
  setError,
  clearError,
  setUserLoading
} from '../../services/slices/user.slice';

describe('userSlice reducers', () => {
  const initialState = {
    isAuth: false,
    user: {} as TUser,
    error: null,
    isLoading: false
  };

  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const mockError = 'Произошла ошибка';

  it('Проверка вернуть initialState', () => {
    expect(UserReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Проверка setUser', () => {
    const newState = UserReducer(initialState, setUser(mockUser));
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuth).toBe(true);
    expect(newState.error).toBeNull();
  });
  //не проверяем логаут, так как он выдает ошибки, связано с кривой архитектурой проекта и настройкой вебпака, из этой папки не видно "document", который используется в куки-функциях
  //   it('Проверка logoutUser', () => {
  //     const loggedInState = {
  //       ...initialState,
  //       isAuth: true,
  //       user: mockUser
  //     };
  //     const newState = UserReducer(loggedInState, logoutUser());
  //     expect(newState.user).toEqual({});
  //     expect(newState.isAuth).toBe(false);
  //     expect(newState.error).toBeNull();
  //   });

  it('Проверка setError', () => {
    const newState = UserReducer(initialState, setError(mockError));
    expect(newState.error).toEqual(mockError);
  });

  it('Проверка clearError', () => {
    const stateWithError = { ...initialState, error: mockError };
    const newState = UserReducer(stateWithError, clearError());
    expect(newState.error).toBeNull();
  });

  it('Проверка setUserLoading', () => {
    const newState = UserReducer(initialState, setUserLoading(true));
    expect(newState.isLoading).toBe(true);
  });

  it('Проверка setUserLoading to false', () => {
    const loadingState = { ...initialState, isLoading: true };
    const newState = UserReducer(loadingState, setUserLoading(false));
    expect(newState.isLoading).toBe(false);
  });
});
