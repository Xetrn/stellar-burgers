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
  isAuthVerified: boolean;
  user: TUser;
  error: string | undefined;
}

export const initialState: TUserState = {
  isAuthVerified: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectUserName: (state) => state.user.name,
    selectAuthStatus: (state) => state.isAuthVerified,
    selectAuthError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthVerified = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = '';
      });
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthVerified = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthVerified = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthVerified = false;
        state.error = '';
      });
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthVerified = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthVerified = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthVerified = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthVerified = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      });
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.isAuthVerified = false;
      state.user = { email: '', name: '' };
    });
  }
});

export const { selectUser, selectUserName, selectAuthStatus, selectAuthError } =
  userSlice.selectors;
