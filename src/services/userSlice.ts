import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  logoutApi,
  registerUserApi,
  loginUserApi,
  resetPasswordApi,
  forgotPasswordApi
} from '../utils/burger-api';
import { TUser } from '../utils/types';

type TUserState = {
  user: TUser | null;
  error: string | null | undefined;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  error: null,
  isAuthChecked: false,
  isAuthenticated: false
};

export const fetchUser = createAsyncThunk('user/fetchUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  forgotPasswordApi
);
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);
export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUserError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message;
      })
      //updateUser
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      //register
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const {
  selectUser,
  selectIsAuthenticated,
  selectIsAuthChecked,
  selectUserError
} = userSlice.selectors;

export default userSlice.reducer;
