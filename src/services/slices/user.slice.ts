import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { deleteTokens, saveTokens } from '../../utils/tokens';

export const fetchUser = createAsyncThunk('user/fetch', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

type TUserState = {
  isAuthorized: boolean;
  user: TUser;
  error: string | undefined | null;
};

const initialState: TUserState = {
  isAuthorized: false,
  user: {
    name: '',
    email: ''
  },
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getIsAuthorized: (state) => state.isAuthorized,
    getUser: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.isAuthorized = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuthorized = false;
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      });
    builder
      .addCase(register.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;
        state.isAuthorized = true;
        state.user = user;
        state.error = null;
        saveTokens({ accessToken, refreshToken });
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthorized = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.error = null;
      });
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;
        state.isAuthorized = true;
        state.user = user;
        state.error = null;
        saveTokens({ accessToken, refreshToken });
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthorized = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthorized = false;
      state.user = {
        name: '',
        email: ''
      };
      state.error = null;
      deleteTokens();
    });
  }
});

export const { getIsAuthorized, getUser } = userSlice.selectors;
