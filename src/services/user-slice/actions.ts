import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { create } from 'react-test-renderer';

export const getUser = createAsyncThunk(
  'user/get',
  async () => await getUserApi()
);
export const logout = createAsyncThunk('user/logout', async () => logoutApi());

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => registerUserApi(registerData)
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData) => loginUserApi(loginData)
);

export const refreshUserToken = createAsyncThunk(
  'user/refreshToken',
  async () => refreshToken()
);
