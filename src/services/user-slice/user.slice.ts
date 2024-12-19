import { TUser } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import {
  getUser,
  loginUser,
  logout,
  refreshUserToken,
  registerUser,
  updateUserData
} from './actions';
import { setCookie } from '../../utils/cookie';
import { TPendingProps } from '../types';

interface IUserState extends TPendingProps {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser;
  loginUserError: string | null;
  loginUserRequest: boolean;
}

const initialState: IUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: { email: '', name: '' },
  loginUserError: null,
  loginUserRequest: false,
  loading: false,
  error: null
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (store) => store.data,
    selectIsAuthenticated: (store) => store.isAuthenticated,
    selectIsAuthChecked: (store) => store.isAuthChecked,
    selectLoginUserError: (store) => store.loginUserError,
    selectLoginUserRequest: (store) => store.loginUserRequest,
    selectError: (store) => store.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
        state.loginUserError = action.error.message || 'Ошибка регистрации';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.loginUserRequest = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })

      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginUserError = action.error.message || 'Ошибка авторизации';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(getUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.loginUserRequest = false;
      })

      .addCase(refreshUserToken.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(refreshUserToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        if (action.payload) {
          localStorage.setItem('refreshToken', action.payload.refreshToken);
        }
      })
      .addCase(updateUserData.pending, (state, action) => {
        state.loginUserRequest = true;
      })

      .addCase(updateUserData.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loginUserRequest = false;
      })

      .addCase(logout.pending, (state, action) => {
        state.loginUserRequest = true;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.data = { email: '', name: '' };
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        setCookie('accessToken', '');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.error = action.error.message;
      });
  }
});

export const {
  selectUser,
  selectIsAuthenticated,
  selectIsAuthChecked,
  selectLoginUserError,
  selectLoginUserRequest
} = UserSlice.selectors;

export default UserSlice.reducer;
