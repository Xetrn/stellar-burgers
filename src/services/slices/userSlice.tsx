import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const logOutUser = createAsyncThunk('user/logout', logoutApi);
export const apiGetUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

export interface TUserState {
  isAuthenticated: boolean;
  currentUser: TUser;
  authErrorMessage: string | undefined;
}

const initialState: TUserState = {
  isAuthenticated: false,
  currentUser: {
    email: '',
    name: ''
  },
  authErrorMessage: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.currentUser,
    selectUserName: (state) => state.currentUser.name,
    selectAuthStatus: (state) => state.isAuthenticated,
    selectAuthError: (state) => state.authErrorMessage
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
        state.authErrorMessage = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authErrorMessage = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.authErrorMessage = '';
      });
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
        state.authErrorMessage = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.authErrorMessage = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.authErrorMessage = '';
      });
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.authErrorMessage = action.error.message!;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.authErrorMessage = action.error.message!;
      })
      .addCase(updateUser.pending, (state) => {
        state.authErrorMessage = '';
      });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.currentUser = { email: '', name: '' };
    });
  }
});

export const { selectUser, selectUserName, selectAuthStatus, selectAuthError } =
  userSlice.selectors;
