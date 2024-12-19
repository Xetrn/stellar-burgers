import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  onFulfilledGetUser,
  onFulfilledLogin,
  onFulfilledLogout,
  onFulfilledRegister,
  onFulfilledUpdateUser,
  onPendingLogin,
  onPendingRegister,
  onPendingUpdateUser,
  onRejectedGetUser,
  onRejectedLogin,
  onRejectedRegister,
  onRejectedUpdateUser
} from '../reducers/user';

export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const getUserRequest = createAsyncThunk('user/get-user', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

export interface TUserState {
  isAuth: boolean;
  user: TUser;
  error: string | undefined;
  isLoading: boolean;
}

export const initialState: TUserState = {
  isAuth: false,
  user: {
    email: '',
    name: ''
  },
  error: '',
  isLoading: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuth: (state) => state.isAuth,
    getUser: (state) => state.user,
    getName: (state) => state.user.name,
    getUserError: (state) => state.error,
    isLoadingAuth: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, onPendingRegister)
      .addCase(register.fulfilled, onFulfilledRegister)
      .addCase(register.rejected, onRejectedRegister);
    builder
      .addCase(login.pending, onPendingLogin)
      .addCase(login.fulfilled, onFulfilledLogin)
      .addCase(login.rejected, onRejectedLogin);
    builder
      .addCase(getUserRequest.fulfilled, onFulfilledGetUser)
      .addCase(getUserRequest.rejected, onRejectedGetUser);
    builder
      .addCase(updateUser.pending, onPendingUpdateUser)
      .addCase(updateUser.fulfilled, onFulfilledUpdateUser)
      .addCase(updateUser.rejected, onRejectedUpdateUser);
    builder.addCase(logout.fulfilled, onFulfilledLogout);
  }
});

export const { isAuth, getUser, getName, getUserError, isLoadingAuth } =
  userSlice.selectors;
