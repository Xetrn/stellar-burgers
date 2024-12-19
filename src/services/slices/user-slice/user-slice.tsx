import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';

export type TUserState = {
  isAuth: boolean;
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TUserState = {
  isAuth: false,
  user: null,
  isLoading: !!getCookie('accessToken'),
  error: null
};

export const fetchUser = createAsyncThunk<{ user: TUser }>(
  'user/fetchUser',
  async () => await getUserApi()
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const updateUser = createAsyncThunk<TUserResponse, Partial<TUser>>(
  'user/updateUser',
  async (userData: Partial<TUser>) => await updateUserApi(userData)
);

export const logoutUser = createAsyncThunk<{ success: boolean }>(
  'user/logoutUser',
  async () => await logoutApi()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectUser: (state) => state.user,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.isLoading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.isLoading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
        state.isLoading = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { selectIsAuth, selectUser, selectIsLoading, selectError } =
  userSlice.selectors;
export default userSlice.reducer;
