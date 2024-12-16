import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  registerUserApi,
  loginUserApi,
  logoutApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

interface TUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TUser | null;
  userError: string | null | undefined;
  IsUserDataLoading: boolean;
}

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  userError: null,
  IsUserDataLoading: false
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);
export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);
export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getIsAuthChecked: (store) => store.isAuthChecked,
    getIsAuthenticated: (store) => store.isAuthenticated,
    getUserData: (store) => store.userData,
    getUserError: (store) => store.userError,
    getUserLoading: (store) => store.IsUserDataLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.IsUserDataLoading = true;
        state.userError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.IsUserDataLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.IsUserDataLoading = false;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.IsUserDataLoading = true;
        state.userError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.IsUserDataLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.IsUserDataLoading = false;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.IsUserDataLoading = true;
        state.userError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.IsUserDataLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.IsUserDataLoading = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.IsUserDataLoading = true;
        state.userError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.IsUserDataLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.IsUserDataLoading = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.IsUserDataLoading = true;
        state.userError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.IsUserDataLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.userError = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userData = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.IsUserDataLoading = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const {
  getIsAuthChecked,
  getIsAuthenticated,
  getUserData,
  getUserError,
  getUserLoading
} = userSlice.selectors;
