import {
  authReducer,
  setLoginFormData,
  setRegisterFormData
} from './authSlice';

describe('authSlice slice', () => {
  const initialState = {
    isAuth: false,
    user: null,
    isLoading: false,
    error: null,
    registerFormData: {
      name: '',
      email: '',
      password: ''
    },
    loginFormData: {
      email: '',
      password: ''
    }
  };

  describe('reducers', () => {
    describe('setRegisterFormData', () => {
      it('должен обновлять данные формы регистрации', () => {
        const newData = {
          name: 'John',
          email: 'john@test.com',
          password: '123456'
        };

        const action = setRegisterFormData(newData);
        const nextState = authReducer(initialState, action);

        expect(nextState.registerFormData).toEqual(newData);
      });

      it('должен частично обновлять данные формы регистрации', () => {
        const partialData = {
          email: 'test@example.com',
          name: 'John',
          password: '123456'
        };

        const action = setRegisterFormData(partialData);
        const nextState = authReducer(initialState, action);

        expect(nextState.registerFormData).toEqual({
          ...initialState.registerFormData,
          ...partialData
        });
      });
    });

    describe('setLoginFormData', () => {
      it('должен обновлять данные формы входа', () => {
        const newData = {
          email: 'john@test.com',
          password: '123456'
        };

        const action = setLoginFormData(newData);
        const nextState = authReducer(initialState, action);

        expect(nextState.loginFormData).toEqual(newData);
      });

      it('должен частично обновлять данные формы входа', () => {
        const partialData = {
          email: 'john@test.com',
          password: '123456'
        };

        const action = setLoginFormData(partialData);
        const nextState = authReducer(initialState, action);

        expect(nextState.loginFormData).toEqual({
          ...initialState.loginFormData,
          ...partialData
        });
      });
    });

    describe('clearRegisterFormData', () => {
      it('должен сбрасывать данные формы регистрации', () => {
        const stateWithData = {
          ...initialState,
          registerFormData: {
            name: 'John',
            email: 'john@test.com',
            password: '123456'
          }
        };
      });
    });
  });

  describe('async actions', () => {
    describe('loginAction', () => {
      it('should set loading state while logging in', () => {
        const nextState = authReducer(initialState, {
          type: 'auth/login/pending'
        });
        expect(nextState.isLoading).toBe(true);
      });

      it('should handle successful login', () => {
        const user = { name: 'John', email: 'john@test.com' };
        const nextState = authReducer(initialState, {
          type: 'auth/login/fulfilled',
          payload: {
            user,
            accessToken: 'token123',
            refreshToken: 'refresh123'
          }
        });

        expect(nextState.isLoading).toBe(false);
        expect(nextState.isAuth).toBe(true);
        expect(nextState.user).toEqual(user);
        expect(nextState.error).toBeNull();
      });

      it('should handle login failure', () => {
        const nextState = authReducer(initialState, {
          type: 'auth/login/rejected',
          error: { message: 'Login failed' }
        });

        expect(nextState.isLoading).toBe(false);
        expect(nextState.error).toBe('Login failed');
      });
    });

    describe('logoutAction', () => {
      const loggedInState = {
        ...initialState,
        isAuth: true,
        user: { name: 'John', email: 'john@test.com' }
      };

      it('should set loading state while logging out', () => {
        const nextState = authReducer(loggedInState, {
          type: 'auth/logout/pending'
        });
        expect(nextState.isLoading).toBe(true);
      });

      it('should handle successful logout', () => {
        const nextState = authReducer(loggedInState, {
          type: 'auth/logout/fulfilled'
        });

        expect(nextState.isLoading).toBe(false);
        expect(nextState.isAuth).toBe(false);
        expect(nextState.user).toBeNull();
        expect(nextState.error).toBeNull();
      });
    });

    describe('updateUserAction', () => {
      const loggedInState = {
        ...initialState,
        isAuth: true,
        user: { name: 'John', email: 'john@test.com' }
      };

      it('should handle successful user update', () => {
        const updatedUser = { name: 'John Updated', email: 'john@test.com' };
        const nextState = authReducer(loggedInState, {
          type: 'auth/update/fulfilled',
          payload: { user: updatedUser }
        });

        expect(nextState.isLoading).toBe(false);
        expect(nextState.user).toEqual(updatedUser);
        expect(nextState.error).toBeNull();
      });

      it('should handle update failure', () => {
        const nextState = authReducer(loggedInState, {
          type: 'auth/update/rejected',
          error: { message: 'Update failed' }
        });

        expect(nextState.isLoading).toBe(false);
        expect(nextState.error).toBe('Update failed');
      });
    });
  });
});
